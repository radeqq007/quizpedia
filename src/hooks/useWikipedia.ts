import type { Language } from "@/types";
import { useQuery } from "@tanstack/react-query";

export type Article = {
  title: string;
  content: string;
};

export function useWikipediaSearch(query: string, lang: Language) {
  return useQuery({
    queryKey: ["wikiSearch", query],
    queryFn: () => fetchWikiSearch(query, lang),
    enabled: !!query,
    placeholderData: (previousData) => previousData,
  });
}

export function useWikipediaArticle(title: string, lang: Language) {
  return useQuery({
    queryKey: ["wikiArticle", title],
    queryFn: () => fetchWikiArticle(title, lang),
    enabled: !!title,
  });
}

const fetchWikiSearch = async (query: string, lang: Language) => {
  if (!query) return [];

  const WIKIPEDIA_BASE = `https://${lang}.wikipedia.org/w/api.php`;

  const url = new URL(WIKIPEDIA_BASE);

  url.searchParams.set("action", "opensearch");
  url.searchParams.set("search", query.trim());
  url.searchParams.set("limit", "6");
  url.searchParams.set("origin", "*");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to search Wikipedia");
  }

  return res.json();
};

const fetchWikiArticle = async (
  title: string,
  lang: Language,
): Promise<Article> => {
  const WIKIPEDIA_BASE = `https://${lang}.wikipedia.org/w/api.php`;

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
