import { Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { YoutubeSearchListResponse, YoutubeSearchResource } from "../shared/models/responses/youtube.search.list.response.model";
import { catchError, of } from "rxjs";
import { YoutubeVideosListResponse } from "../shared/models/responses/youtube.videos.list.response.model";
import { parse, toSeconds } from 'iso8601-duration';

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
    const getSearchListUrl = encodeURI(
      this.YOUTUBE_SEARCH_LIST_URL
      + '?part=snippet'
      + '&key=REPLACE_ME'
      + '&videoEmbeddable=true'
      + '&type=video'
      + '&regionCode=US'
      + '&safeSearch=moderate'
      + '&maxResults=50'
      + `&q=${query}`
    );

    // Retrieve list of embeddable YouTube videos that match search query
    this.http.get<YoutubeSearchListResponse>(getSearchListUrl).pipe(
      catchError(() => {
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
    const getVideosListUrl = encodeURI(
      this.YOUTUBE_VIDEOS_LIST_URL
      + '?key=REPLACE_ME'
      + '&part=player,contentDetails'
      + `&id=${videoIds.join(',')}`
    );

    // Retrieve list of YouTube video <Iframes> that match the VideoIds
    this.http.get<YoutubeVideosListResponse>(getVideosListUrl).pipe(
      catchError(error => {
        return of([]);
      })
    ).subscribe(videosListResponse => {
      videosListResponse = videosListResponse as YoutubeVideosListResponse;

      videosListResponse.items.map(videoResource => {
        // Add the snippet field from search response to video response
        const matchingSearchListItem = (this.youtubeSearchListResponse() as YoutubeSearchListResponse).items.find(
          item => item.id.videoId == videoResource.id
        ) as YoutubeSearchResource;
        videoResource.snippet = matchingSearchListItem.snippet;

        // Initialize splice detail values
        videoResource.startTime = 0;
        videoResource.endTime = toSeconds(parse(videoResource.contentDetails.duration));
        videoResource.isClipEdited = false;

        return videoResource;
      });

      this.youtubeVideosListResponse.set(videosListResponse);
    });
  }
}
