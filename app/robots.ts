import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/seller/', '/api/', '/checkout/'],
    },
    sitemap: 'https://moomel.sn/sitemap.xml',
  }
}
