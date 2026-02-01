import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

export interface PageMetadata {
  title: string;
  order: number;
  slug: string;
  module: string;
  description?: string;
}

export interface NavigationLink {
  slug: string;
  title: string;
  order: number;
}

export function getAllPagesInModule(module: string) {
  const modulePath = path.join(CONTENT_PATH, module);
  if (!fs.existsSync(modulePath)) return [];

  const files = fs.readdirSync(modulePath);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fileContents = fs.readFileSync(path.join(modulePath, file), 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        order: data.order as number,
        description: data.description as string | undefined, // Aseguramos que se devuelva
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPageData(module: string, slug: string) {
  const fullPath = path.join(CONTENT_PATH, module, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const allPages = getAllPagesInModule(module);
  const currentIndex = allPages.findIndex((p) => p.slug === slug);
  
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return {
    metadata: {
      ...data,
      slug,
      module,
    } as PageMetadata,
    content,
    navigation: {
      prev: prevPage as NavigationLink | null,
      next: nextPage as NavigationLink | null,
    }
  };
}
