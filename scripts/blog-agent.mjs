#!/usr/bin/env node
/**
 * Weekly Blog Agent
 *
 * Run: node scripts/blog-agent.mjs
 *
 * Requires .env with:
 *   ANTHROPIC_API_KEY=sk-ant-...
 *   GITHUB_TOKEN=ghp_...        (needs repo + pull_request scopes)
 *   GITHUB_REPO=RezaBaza/reza-website
 */

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ── Config ────────────────────────────────────────────────────────────────────

const REPO_ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const TOPICS_FILE = path.join(REPO_ROOT, 'src/data/blog-topics.md');
const POSTS_DIR = path.join(REPO_ROOT, 'src/data/post');
const GITHUB_REPO = process.env.GITHUB_REPO || 'RezaBaza/reza-website';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function pickNextTopic(topicsContent) {
  const lines = topicsContent.split('\n');
  for (const line of lines) {
    const match = line.match(/^- \[ \] (.+)/);
    if (match) {
      const parts = match[1].split('|').map((s) => s.trim());
      return {
        title: parts[0],
        category: parts[1] || 'AI in Practice',
        notes: parts[2] || '',
        raw: line,
      };
    }
  }
  return null;
}

function markTopicDone(topicsContent, rawLine) {
  return topicsContent.replace(rawLine, rawLine.replace('- [ ]', '- [x]'));
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

async function githubApi(method, endpoint, body) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${endpoint} → ${res.status}: ${text}`);
  }
  return res.json();
}

// ── Write post with Claude ────────────────────────────────────────────────────

async function writePost(topic) {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const systemPrompt = `You are ghostwriting a blog post for Reza Bazargan, Senior Data Strategist at Governo Insikt AB in Stockholm.

VOICE & STYLE:
- Direct, clear, no jargon. Write for curious non-technical readers and practitioners alike.
- First person ("I've seen", "In my experience") but not self-promotional.
- Concrete examples over abstract principles. Specific beats vague.
- Short paragraphs. No bullet lists unless truly needed.
- Slightly understated — Reza doesn't oversell.
- End with a practical takeaway or reflection, not a call to action.
- Professional but warm. This is someone who has worked in data and analytics leadership for 10+ years across SaaS (Mentimeter), public sector (Governo Insikt), academia (Stockholm University), and consulting.

FORMAT:
- Return ONLY valid markdown. No commentary before or after. Do NOT wrap in ```markdown fences.
- Frontmatter (YAML):
  publishDate: [today's ISO date]T08:00:00Z
  author: Reza Bazargan
  title: "[title in quotes]"
  excerpt: "[one-sentence summary that makes someone want to read it, in quotes]"
  category: [exact category name]
  tags:
    - [2-4 relevant lowercase tags]
- After frontmatter: the post body. 600–900 words.
- End with a short italicised bio line: *Reza Bazargan is a Senior Data Strategist at Governo Insikt AB, where he helps [relevant description].*

SOURCES TO DRAW FROM (search your knowledge):
- The Neuron Daily, ai.se, digg.se, government.se for AI/public sector
- Real examples from Swedish municipalities, regions, and agencies
- Practical data/analytics leadership experience`;

  const userPrompt = `Write a blog post with this topic:

Title idea: ${topic.title}
Category: ${topic.category}
Notes: ${topic.notes}
Today's date: ${todayISO()}

Remember to include realistic, concrete examples. Swedish context where relevant.`;

  console.log('Calling Claude to write the post...');
  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 2048,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  return message.content[0].text.trim();
}

// ── Git + PR ──────────────────────────────────────────────────────────────────

function git(cmd, cwd = REPO_ROOT) {
  return execSync(`git ${cmd}`, { cwd, encoding: 'utf8' }).trim();
}

async function createPR(branchName, topic, postFile) {
  const [owner, repo] = GITHUB_REPO.split('/');

  const pr = await githubApi('POST', `/repos/${owner}/${repo}/pulls`, {
    title: `[Blog] ${topic.title}`,
    body: `## New blog post ready for review

**Title:** ${topic.title}
**Category:** ${topic.category}
**File:** \`src/data/post/${postFile}\`

---

Review the post in the \`Files changed\` tab. When you're happy with it, merge this PR to publish.

*Generated by the weekly blog agent.*`,
    head: branchName,
    base: 'main',
  });

  return pr.html_url;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate env
  if (!ANTHROPIC_API_KEY) throw new Error('Missing ANTHROPIC_API_KEY in .env');
  if (!GITHUB_TOKEN) throw new Error('Missing GITHUB_TOKEN in .env');

  // 1. Pick topic
  const topicsContent = fs.readFileSync(TOPICS_FILE, 'utf8');
  const topic = pickNextTopic(topicsContent);
  if (!topic) {
    console.log('No pending topics in blog-topics.md. Add some and re-run.');
    process.exit(0);
  }
  console.log(`Topic: "${topic.title}" [${topic.category}]`);

  // 2. Write post
  const postMarkdown = await writePost(topic);

  // 3. Extract title from frontmatter to build slug
  const titleMatch = postMarkdown.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const slug = slugify(titleMatch ? titleMatch[1] : topic.title);
  const postFileName = `${slug}.md`;
  const postPath = path.join(POSTS_DIR, postFileName);

  // 4. Mark topic done on main before branching (keeps blog-topics.md on main)
  const updatedTopics = markTopicDone(topicsContent, topic.raw);
  fs.writeFileSync(TOPICS_FILE, updatedTopics, 'utf8');
  git('add src/data/blog-topics.md');
  git(`commit -m "blog: mark '${topic.title}' as in progress"`);
  git('push origin main');

  // 5. Create git branch from updated main
  const branchName = `blog/${slug}-${todayISO()}`;
  git('fetch origin main');
  git(`checkout -b ${branchName} origin/main`);

  // 6. Write post file and commit on branch
  fs.writeFileSync(postPath, postMarkdown, 'utf8');
  git(`add src/data/post/${postFileName}`);
  git(`commit -m "blog: add post '${topic.title}'"`);
  git(`push origin ${branchName}`);

  // 7. Create PR
  console.log('Creating GitHub PR...');
  const prUrl = await createPR(branchName, topic, postFileName);

  // 8. Back to main
  git('checkout main');

  console.log(`\nDone! Review and merge your post here:\n${prUrl}\n`);
}

main().catch((err) => {
  console.error('Blog agent error:', err.message);
  process.exit(1);
});
