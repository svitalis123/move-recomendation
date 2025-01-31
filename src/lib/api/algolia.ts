// src/lib/api/algolia.ts
import * as algoliaSearch from 'algoliasearch/lite';
import type { SearchClient, SearchIndex } from 'algoliasearch/lite';
import type { AlgoliaMovie, AlgoliaSearchResponse } from '@/types/api';

class AlgoliaClient {
  private client: SearchClient;
  private movieIndex: SearchIndex;

  constructor() {
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY) {
      throw new Error('Algolia credentials are not configured');
    }

    this.client = algoliaSearch.default(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
    );
    this.movieIndex = this.client.initIndex('movies');
  }

  async searchMovies(query: string): Promise<AlgoliaSearchResponse> {
    if (!query.trim()) {
      return {
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        hitsPerPage: 0
      };
    }

    try {
      return await this.movieIndex.search<AlgoliaMovie>(query);
    } catch (error) {
      console.error('Algolia search error:', error);
      throw new Error('Failed to search movies');
    }
  }
}

// Create singleton instance
const algoliaClient = new AlgoliaClient();
export { algoliaClient };