// PROVIDED HELPER: you do not need to write or edit this file.
// It is the real data source behind the lookup tool (Stage 2): the public Wikipedia API, no API key needed.
// Your job in Stage 2 is the Mastra part: calling `searchWikipedia(query)` from a tool's execute function.
export type Source = { title: string; snippet: string; source: string };

const API = 'https://en.wikipedia.org/w/api.php';

/** Search Wikipedia and return the top matches with a short intro extract and the page URL as the source. */
export async function searchWikipedia(query: string, limit = 3): Promise<Source[]> {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: query,
    gsrlimit: String(limit),
    prop: 'extracts',
    exintro: '1',
    explaintext: '1',
    exsentences: '3',
    format: 'json',
    formatversion: '2',
  });
  const res = await fetch(`${API}?${params}`, {
    // Wikipedia asks API clients to identify themselves.
    headers: { 'User-Agent': 'mastra-research-assistant-tutorial/1.0' },
  });
  if (!res.ok) throw new Error(`Wikipedia request failed: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as {
    query?: { pages: { pageid: number; title: string; index: number; extract?: string }[] };
  };
  return (data.query?.pages ?? [])
    .sort((a, b) => a.index - b.index)
    .filter((p) => p.extract)
    .map((p) => ({
      title: p.title,
      snippet: p.extract!.trim(),
      source: `https://en.wikipedia.org/?curid=${p.pageid}`,
    }));
}
