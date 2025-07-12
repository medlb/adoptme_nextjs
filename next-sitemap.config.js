const fs = require('fs');
const path = require('path');


// Blog posts are hardcoded in app/blog/[slug]/page.tsx
const blogPosts = [
  {
    id: "getting-started-guide",
    date: "2024-01-15",
  },
  {
    id: "pet-rarity-explained",
    date: "2025-01-10",
  },
  {
    id: "community-spotlight",
    date: "2025-04-05",
  },
];

// Main pages (add or remove as needed)
const mainPages = [
  '/',
  '/free-adopt-me-pets',
  '/adopt-me-wfl',
  '/about',
  '/blog',
  '/legal/terms-of-service',
  '/legal/privacy-policy',
];

const today = new Date().toISOString().split('T')[0];

module.exports = {
  siteUrl: 'https://receivepets.com', // Updated to real domain
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    // Blog posts
    const blogPaths = blogPosts.map(post => ({
      loc: `/blog/${post.id}`,
      lastmod: post.date,
    }));
    // Main pages
    const mainPaths = mainPages.map(page => ({
      loc: page,
      lastmod: today,
    }));
    return [...mainPaths, ...blogPaths];
  },
}; 