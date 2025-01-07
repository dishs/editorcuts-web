import fs from 'fs/promises'
import path from 'path'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import dotenv from 'dotenv'
import siteMetadata from '../data/siteMetadata.js'

dotenv.config()

const API_URL = 'http://localhost:1337/graphql'
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
  'allowDiskUse': true
}

async function getPublishedContent() {
  const limit = 100; // Number of results to fetch at a time
  let start = 0; // Starting index of the results
  try {
    let newVideos = [];
    let totalVideos = [];

    do {
      const query = `
        query getYoutubeArticleContent {
          youtubeVideos(sort: "createdAt:desc", where: { published: true, owner: "${siteMetadata.owner}" }, start: ${start}, limit: ${limit}) {
            title
            blog_title
            video_id
            channel_name
            channel_url
            url
            thumbnail
            slug
            summary_video
            summary_comments
            short_summary
            keywords
            draft
            published
            is_featured
            is_trending
            is_popular
            createdAt
            screenshots
          }
        }
      `;
      console.log(`Fetching videos starting from index: ${start}`);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ query, allowDiskUse: true }),
      });

      const { data, errors } = await response.json();
      if (errors) {
        console.error('GraphQL errors:', errors);
        break;
      }

      const youtubeVideos = data.youtubeVideos;
      newVideos = youtubeVideos || [];
      console.log(`Fetched ${newVideos.length} videos`);

      if (newVideos.length > 0) {
        totalVideos = [...totalVideos, ...newVideos];
      }

      start += limit;
    } while (newVideos.length === 10);
    // } while (newVideos.length === limit);

    // Fetch related articles for each video
    for (let video of totalVideos) {
      video.relatedArticles = await fetchRelatedArticles(video.channel_name, video.video_id);
    }
    totalVideos = totalVideos.filter(video => !allBlogs.some(blog => blog.title === video.blog_title));

    console.log(`${totalVideos.length} New Videos Found.`);
    const writePromises = totalVideos.map(video => createMDXFile(video));
    await Promise.all(writePromises);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

const cache = new Map();

async function fetchRelatedArticles(channelName, currentVideoId) {
  if (cache.has(channelName)) {
    return cache.get(channelName);
  }
  console.log(`Fetching related articles for ${channelName} and video id ${currentVideoId}`);
  const query = `
    query getRelatedArticles {
      youtubeVideos(
        sort: "createdAt:desc"
        where: { published: true, owner: "${siteMetadata.owner}", channel_name:"${channelName}", video_id_ne: "${currentVideoId}" }
        limit: 4
      ) {
        title
        is_trending
        blog_title
        video_id
        channel_name
        channel_url
        url
        thumbnail
        slug
        summary_video
        summary_comments
        short_summary
        keywords
        published
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query }),
  });

  const { data, errors } = await response.json();
  if (errors) {
    console.error('GraphQL errors when fetching related articles:', errors);
    return [];
  }

  const articles = data.youtubeVideos || [];
  console.log(`Fetched ${articles.length} related articles for ${channelName}`);

  // Store the result in cache
  cache.set(channelName, articles);

  return articles;
}

async function createMDXFile(video) {
  // const tags = video.keywords ? video.keywords.split(',').map(tag => tag.trim()) : []
  const tags = video.keywords ? video.keywords.split(',').map(tag => `"${tag.trim()}"`).join(', ') : ''
  const images = video.screenshots ? [video.thumbnail, ...video.screenshots] : [video.thumbnail]
  video.blog_title = video.blog_title.replace(/"/g, '\\"')
  video.short_summary = video.short_summary.replace(/"/g, '\\"')
  if (!video.summary_comments) {
    video.summary_comments = "Available soon."
  }

  let frontmatter = `---
title: "${video.blog_title}"
date: "${new Date(video.createdAt).toISOString()}"
tags: ["${video.channel_name}", ${tags}]
draft: ${video.draft}
is_featured: ${video.is_featured}
is_trending: ${video.is_trending}
is_popular: ${video.is_popular}
summary: "${video.short_summary}"
layout: PostLayout
images: [${images}]
---
${video.summary_video}
`
  frontmatter += `
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pr-5 pl-5">
`
  {Array.isArray(images) &&
    images.slice(1).map((image) => (
      frontmatter += `
      <div key="${image}" className="w-full object-cover object-center rounded-lg">
        <LazyImage
          src="${siteMetadata.siteUrl}/${image}"
          alt="${video.slug}"
          classes="lazy-image w-full object-cover aspect-video rounded-lg"
        />
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">Image copyright Youtube</p>
        </div>
      </div>`
    ))}
    
frontmatter += `</div>
<LazyIframe url="https://www.youtube.com/embed/${video.video_id}" title="YouTube video player" />
## [Watch ${video.title} on Youtube](${video.url})
## Viewer Reactions for ${video.title}
<div className="space-y-2">
`
  let splitComments = video.summary_comments.split('\n').map(comment => comment.replace(/^- /, ''));
  for (let i = 0; i < splitComments.length; i++) {
    frontmatter += `
      <div key="${i}" className="rounded-md p-1 pl-3 text-md leading-none font-normal bg-gray-50 text-white-100 dark:bg-gray-800 dark:text-white-100">
        <p>${splitComments[i]}</p>
      </div>
    `
  }
  frontmatter += `</div>`

  // # iterate through related articles and add them to the frontmatter of the blog post
  if (video.relatedArticles.length > 0) {
    frontmatter += `
## Related Articles
<div className="space-y-2 mx-auto relative">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
`
    for (let article of video.relatedArticles) {
      frontmatter += `
    <div key="${article.slug}" className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
      <LazyImage
        src="${article.thumbnail}"
        alt="${article.slug}"
        classes="lazy-image w-full object-cover aspect-video"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-3 py-1 rounded-full text-sm">${article.channel_name}</span>
        </div>
        <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
          <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/blog/${article.slug}">${article.blog_title}</a>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">${article.short_summary}</p>
      </div>
    </div>
`
    }
    frontmatter += `
  </div>
</div>`
  }

  const fileName = `${video.slug}.mdx`
  const filePath = path.join(process.cwd(), 'data', 'blog', fileName)

  try {
    await fs.writeFile(filePath, frontmatter)
    console.log(`Created ${fileName}`)
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error)
  }
}
const import_articles = getPublishedContent

export default import_articles
