import { Injectable } from '@angular/core';
import { YoutubeVideoResource } from "../models/responses/youtube.videos.list.response.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sessionStorage: Storage | undefined;

  readonly SAVED_VIDEOS_STORAGE_KEY = "savedVideos";

  constructor() {
    this.sessionStorage = document.defaultView?.sessionStorage;
  }

  storeSavedVideos(videos: YoutubeVideoResource[]) {
    this.sessionStorage?.setItem(this.SAVED_VIDEOS_STORAGE_KEY, JSON.stringify(videos));
  }

  retrieveSavedVideos(): YoutubeVideoResource[] {
    const savedVideosJson = this.sessionStorage?.getItem(this.SAVED_VIDEOS_STORAGE_KEY);
    if (!savedVideosJson) {
      return [];
    }
    return JSON.parse(savedVideosJson);
  }
}
