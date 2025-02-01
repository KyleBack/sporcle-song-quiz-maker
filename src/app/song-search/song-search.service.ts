import { Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { YoutubeSearchListResponse } from "../shared/models/youtube.search.list.response.model";
import { catchError, of } from "rxjs";
import { YoutubeVideosListResponse } from "../shared/models/youtube.videos.list.response.model";

@Injectable({
  providedIn: 'root'
})
export class SongSearchService {

  private readonly YOUTUBE_SEARCH_LIST_URL = 'https://www.googleapis.com/youtube/v3/search';
  private readonly YOUTUBE_VIDEOS_LIST_URL = 'https://www.googleapis.com/youtube/v3/videos';

  public youtubeSearchListResponse = signal<YoutubeSearchListResponse | null>(null);
  public youtubeVideosListResponse = signal<YoutubeVideosListResponse | null>(null);

  constructor(private http: HttpClient) {}

  public resetResponses(): void {
    this.youtubeSearchListResponse.set(null);
    this.youtubeVideosListResponse.set(null);
  }

  public getSearchList(query: string | null): void {
    // Construct API request
    const getSearchListUrl = this.YOUTUBE_SEARCH_LIST_URL
      + '?key=REPLACE_ME'
      + '&videoEmbeddable=true'
      + `&q=${query ?? ""}`
      + '&regionCode=US'
      + '&maxResults=50'
      + '&part=snippet'
      + '&type=video';

    // Retrieve list of embeddable YouTube videos that match search query
    this.http.get<YoutubeSearchListResponse>(getSearchListUrl).pipe(
      catchError(error => {
        console.error('Error fetching posts:', error);
        return of([]);
      })
    ).subscribe(searchListResponse => {
      this.youtubeSearchListResponse.set(searchListResponse as YoutubeSearchListResponse);

      // Get list of videoIds from response
      const videoIds = this.youtubeSearchListResponse()?.items
        .map(searchResource => searchResource.id.videoId);

      if (videoIds == null)
        return;

      this.getVideosList(videoIds);
    });
  }

  public getVideosList(videoIds: string[]): void {
    // Construct API request
    const getVideosListUrl = this.YOUTUBE_VIDEOS_LIST_URL
      + '?key=REPLACE_ME'
      + '&maxWidth=400'
      + '&part=player'
      + `&id=${videoIds.join(',')}`;

    // Retrieve list of YouTube video <Iframes> that match the VideoIds
    this.http.get<YoutubeVideosListResponse>(getVideosListUrl).pipe(
      catchError(error => {
        console.error('Error fetching posts:', error);
        return of([]);
      })
    ).subscribe(videosList => {
      this.youtubeVideosListResponse.set(videosList as YoutubeVideosListResponse);
    });
  }
}
