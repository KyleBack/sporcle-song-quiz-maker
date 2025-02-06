import { Thumbnail } from "./youtube.search.list.response.model";

export interface YoutubeVideosListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeVideoResource[];
}

export interface YoutubeVideoResource {
  kind: string;
  etag: string;
  id: string;
  player: {
    embedHtml: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnail[];
    channelTitle: string;
    liveBroadcastContent: string;
  };
}
