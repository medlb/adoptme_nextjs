import type { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  category,
}: SEOProps): Metadata {
  const baseUrl = 'https://receivepets.com'
  
  const metadata: Metadata = {
    title: `${title} | ReceivePets 🐾`,
    description,
    keywords: [
      ...keywords,
      'receive pets',
      'adoptme pets',
      'roblox',
      'pet adoption',
      'virtual pets'
    ],
    authors: author ? [{ name: author }] : [{ name: 'ReceivePets Team' }],
    creator: 'ReceivePets',
    publisher: 'ReceivePets',
    category: category || 'Gaming',
    
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonical || baseUrl,
      siteName: 'ReceivePets',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ReceivePets`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@ReceivePets',
      creator: '@ReceivePets',
      title,
      description,
      images: [ogImage],
    },
    
    alternates: {
      canonical: canonical || baseUrl,
    },
    
    robots: noIndex ? {
      index: false,
      follow: false,
      nocache: true,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
  
  return metadata
}

// Predefined SEO templates for common pages
export const seoTemplates = {
  home: () => generateSEO({
    title: 'ReceivePets - Get Free Adopt Me Pets & WFL Calculator | #1 Adopt Me Site',
    description: '🎉 Get FREE Adopt Me pets & use our WFL calculator! Claim legendary pets, rare pets & exclusive pets for free. Check trade values with our Adopt Me calculator. Join 100,000+ players!',
    keywords: [
      'free adopt me pets',
      'adopt me wfl calculator',
      'adopt me pets free',
      'adopt me trade calculator',
      'free pets adopt me',
      'adopt me pet values',
      'adopt me pets giveaway',
      'adopt me calculator',
      'receivepets',
      'adopt me pets 2025',
      'roblox adopt me pets'
    ],
    canonical: 'https://receivepets.com',
  }),
  
  freePets: () => generateSEO({
    title: 'Free Adopt Me Pets - Get Amazing Pets for Free!',
    description: '🎉 Discover and claim FREE Adopt Me pets! Browse through hundreds of rare pets, legendary pets, and exclusive pets. Get your favorite Adopt Me pets for free today!',
    keywords: [
      'free adopt me pets',
      'adopt me pets free',
      'free pets adopt me',
      'adopt me free pets 2025',
      'free legendary pets adopt me',
      'adopt me pets giveaway',
      'free rare pets adopt me',
      'adopt me pets claim'
    ],
    canonical: 'https://receivepets.com/free-adopt-me-pets',
    ogImage: '/images/free-pets-og.jpg',
  }),
  
  wflCalculator: () => generateSEO({
    title: 'Adopt Me WFL Calculator - Win Fair Lose Trade Calculator',
    description: '🔥 Use our advanced Adopt Me WFL calculator to check if your trades are fair! Get accurate pet values, compare trades, and make smart trading decisions.',
    keywords: [
      'adopt me wfl',
      'adopt me calculator',
      'wfl calculator adopt me',
      'adopt me trade calculator',
      'adopt me pet values',
      'adopt me worth calculator',
      'wfl adopt me',
      'adopt me trading calculator'
    ],
    canonical: 'https://receivepets.com/adopt-me-wfl',
    ogImage: '/images/wfl-calculator-og.jpg',
  }),
  
  blog: () => generateSEO({
    title: 'Adopt Me Blog - Tips, Guides & News',
    description: '📚 Read the latest Adopt Me guides, tips, and news! Learn about pet values, trading strategies, rare pets, and get insider tips from the community.',
    keywords: [
      'adopt me blog',
      'adopt me guides',
      'adopt me tips',
      'adopt me news',
      'adopt me strategies',
      'adopt me tutorials'
    ],
    canonical: 'https://receivepets.com/blog',
    ogImage: '/images/blog-og.jpg',
  }),
}

// Generate structured data for different content types
export function generateStructuredData(type: 'website' | 'article' | 'faq' | 'breadcrumb', data: any) {
  const baseUrl = 'https://receivepets.com'
  
  switch (type) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ReceivePets',
        url: baseUrl,
        description: 'Get FREE Adopt Me pets & use our advanced WFL calculator!',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/free-adopt-me-pets?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: 'ReceivePets',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`
          }
        }
      }
      
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || 'ReceivePets Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'ReceivePets',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`
          }
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        image: data.image || `${baseUrl}/images/og-image.jpg`
      }
      
    default:
      return null
  }
}
