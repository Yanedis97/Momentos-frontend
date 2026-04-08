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

  flags?: Record<string, any>;
}