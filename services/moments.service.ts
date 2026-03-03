import { apiGet, apiPost, apiPut } from "./api";
import { Moment, MomentListItem } from "@/types/moments";

export const getMoments = async (): Promise<MomentListItem[]> => {
  return apiGet("/moments/");
};

export const getMoment = async (momentId: string): Promise<Moment> => {
  return apiGet(`/moments/${momentId}`);
};

export const createMoment = async (moment: Moment) => {
  return apiPost("/moments/", moment);
};

export const createGroupMoments = async (moments: Moment[]) => {
  return apiPost("/moments/create_all", moments);
};

export const updateMoment = async (
  momentId: string,
  data: Partial<Moment>
) => {
  return apiPut(`/moments/${momentId}`, data);
};