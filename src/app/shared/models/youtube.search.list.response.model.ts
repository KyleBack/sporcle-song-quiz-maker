export interface YoutubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    "totalResults": number;
    "resultsPerPage": number;
  };
  items: YoutubeSearchResource[];
}

export interface YoutubeSearchResource {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnail[];
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
