export interface GetSplicedAudioRequest {
  splice_offset: number;
  video_details_list: SpliceDetails[];
}

export interface SpliceDetails {
  video_id: string;
  start_time: number;
  end_time: number;
}

