export interface PlayerProgress {
  player_id: string;
  moment_id: string;
  status: string;
  current_step: string;
  last_interaction_at: string;
  completed_at: string | null;
  title?: string;
  country?: string;
  year?: number;
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
  choice_next?: string | null;
}

export type StepType =
  | "scene"
  | "decision"
  | "pause"
  | "reveal";

export interface Scene {
  bg?: string;
  audio?: string;
  text?: string;
  pace?: "slow" | "medium" | "fast";
  autoNext?: number;
}

export interface Choice {
  id: string;
  label: string;
  next: string;
}

export interface PlayStepResponse {
  moment_id: string;
  step: string;
  type: StepType;

  scene?: Scene;

  autoNext?: number;
  duration?: number;

  choices?: Choice[];

  next_step?: string | null;
  is_last: boolean;

  flags?: Record<string, unknown>;
}

export interface StartStepResponse {
  player_id: string;
  moment_id: string;
  start_step: string;
  is_new: boolean;
}
