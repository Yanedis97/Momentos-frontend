import { apiGet, apiPost } from "./api";
import {
  PlayerProgress,
  PaginatedPlayerMoments,
  PlayStepRequest,
  PlayStepResponse,
} from "@/types/progress";

export const getProgress = async (
  playerId: string,
  momentId: string
): Promise<PlayerProgress> => {
  return apiGet(`/progress/${playerId}/${momentId}`);
};

export const getPlayerMoments = async (
  playerId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedPlayerMoments> => {
  return apiGet(
    `/progress/${playerId}?page=${page}&limit=${limit}`
  );
};

export const playStep = async (
  payload: PlayStepRequest
): Promise<PlayStepResponse> => {
  return apiPost("/progress/play", payload);
};