import { Inject, Injectable } from '@angular/core';
import { YoutubeVideoResource } from "../models/responses/youtube.videos.list.response.model";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sessionStorage: Storage | undefined;

  readonly SAVED_VIDEOS_STORAGE_KEY = "savedVideos";

  constructor(@Inject(DOCUMENT) private document: Document) {
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
