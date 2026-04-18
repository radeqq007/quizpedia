import { useQuery } from '@tanstack/react-query';

const WIKIPEDIA_BASE = 'https://en.wikipedia.org/w/api.php';

export type Article = {
  title: string;
  content: string;
  url: string;
};

export function useWikipediaSearch(query: any) {
  return useQuery({
    queryKey: ['wikiSearch', query],
    queryFn: () => fetchWikiSearch(query),
    enabled: !!query,
    placeholderData: previousData => previousData,
  });
}

const fetchWikiSearch = async (query: string) => {
  if (!query) return [];

  const url = new URL(WIKIPEDIA_BASE);

  url.searchParams.set('action', 'opensearch');
  url.searchParams.set('search', query.trim());
  url.searchParams.set('limit', '1');
  url.searchParams.set('origin', '*');
  url.searchParams.set('format', 'json');

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('Failed to search Wikipedia');
  }

  return res.json();
};
