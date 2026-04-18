import { useQuery } from "@tanstack/react-query";

const WIKIPEDIA_BASE = "https://en.wikipedia.org/w/api.php";

export type Article = {
  title: string;
  content: string;
};

export function useWikipediaSearch(query: string) {
  return useQuery({
    queryKey: ["wikiSearch", query],
    queryFn: () => fetchWikiSearch(query),
    enabled: !!query,
    placeholderData: (previousData) => previousData,
  });
}

export function useWikipediaArticle(title: string) {
  return useQuery({
    queryKey: ["wikiArticle", title],
    queryFn: () => fetchWikiArticle(title),
    enabled: !!title,
  });
}

const fetchWikiSearch = async (query: string) => {
  if (!query) return [];

  const url = new URL(WIKIPEDIA_BASE);

  url.searchParams.set("action", "opensearch");
  url.searchParams.set("search", query.trim());
  url.searchParams.set("limit", "0");
  url.searchParams.set("origin", "*");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to search Wikipedia");
  }

  return res.json();
};

const fetchWikiArticle = async (title: string): Promise<Article> => {
  const url = new URL(WIKIPEDIA_BASE);

  url.searchParams.set("action", "query");
  url.searchParams.set("prop", "extracts|info");
  url.searchParams.set("explaintext", "true");
  // url.searchParams.set("inprop", "url");
  url.searchParams.set("titles", title);
  url.searchParams.set("origin", "*");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch article");

  const data = await res.json();

  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const page = pages[pageId];

  if (!page || page.missing) {
    throw new Error("Article not found");
  }

  return {
    title: page.title,
    content: page.extract,
  };
};
