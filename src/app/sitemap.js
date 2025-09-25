export default async function sitemap() {
  const baseUrl = 'https://dibster.dev';

  const routes = [
    '',
    '/projects',
    '/certifications',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}