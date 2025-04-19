import { Injectable } from '@angular/core';
import { YoutubeVideoResource } from "../models/responses/youtube.videos.list.response.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class SavedVideosService {

  savedVideos: YoutubeVideoResource[] = [];

  constructor(private storageService: StorageService) {}

  getSavedVideoById(id: string): YoutubeVideoResource | null {
    return this.savedVideos.find(video => video.id === id) ?? null;
  }

  addSavedVideo(video: YoutubeVideoResource): void {
    this.savedVideos.push(video);
    this.storageService.storeSavedVideos(this.savedVideos);
  }

  removeSavedVideo(video: YoutubeVideoResource): void {
    const index = this.savedVideos.indexOf(video);
    this.savedVideos.splice(index, 1);
    this.storageService.storeSavedVideos(this.savedVideos);
  }

  updateSavedVideo(updatedVideo: YoutubeVideoResource): void {
    const index = this.savedVideos.findIndex(video => video.id === updatedVideo.id);
    this.savedVideos[index] = updatedVideo;
    this.storageService.storeSavedVideos(this.savedVideos);
  }

  refreshSavedVideos(): void {
    this.savedVideos = this.storageService.retrieveSavedVideos();
  }
}
