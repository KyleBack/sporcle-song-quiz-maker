import { Injectable, signal } from '@angular/core';
import { GetSplicedAudioRequest } from "../shared/models/requests/splice.audio.request.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of } from "rxjs";
import { YoutubeVideoResource } from "../shared/models/responses/youtube.videos.list.response.model";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AudioSplicerService {

  private readonly GET_SPLICED_AUDIO_URL = "http://127.0.0.1:5000/splice-videos"

  public getSplicedAudioBlobResponse = signal<SafeUrl | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  generateGetSplicedAudioRequest(videos: YoutubeVideoResource[], spliceOffset: number): GetSplicedAudioRequest {
    return {
      splice_offset: spliceOffset,
      video_details_list: videos.map(video => {
        return {
          video_id: video.id,
          start_time: video.startTime,
          end_time: video.endTime
        }
      })
    }
  }

  getSplicedAudio(getSplicedAudioRequest: GetSplicedAudioRequest) {
    // Construct API request
    const getSplicedAudioUrl = encodeURI(this.GET_SPLICED_AUDIO_URL);
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    // Call API to generate spliced audio file
    this.http.post(getSplicedAudioUrl, getSplicedAudioRequest, {headers: headers, responseType: 'blob' as 'json'}).pipe(
      catchError(() => {
        return of([]);
      })
    ).subscribe((blob: any) => {
      this.getSplicedAudioBlobResponse.set(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
    });
  }

  resetGetSplicedAudioBlobResponse() {
    this.getSplicedAudioBlobResponse.set(null);
  }
}
