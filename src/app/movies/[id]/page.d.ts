import { Metadata } from 'next';

declare module '*/app/movies/[id]/page' {
  interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }

  export { PageProps };
  export function generateMetadata(props: PageProps): Promise<Metadata>;
}