export interface PlayerProgress {
  player_id: string;
  moment_id: string;
  current_step: string;
  completed: boolean;
  paused: boolean;
}

export interface PaginatedPlayerMoments {
  data: PlayerProgress[];
  page: number;
  limit: number;
  total: number;
}

export interface PlayStepRequest {
  moment_id: string;
  player_id: string;
  step: string;
}

export interface PlayStepResponse {
  moment_id: string;
  step: string;
  text: string;
  next_step: string | null;
  is_last: boolean;
}