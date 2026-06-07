import { apiGet } from "./api";

export interface MomentDiscovery {
  moment_id: string;
  title: string;
  location?: { lat: number; lng: number };
  expires_in: number;
}

export const getDiscovery = async (playerId: string): Promise<MomentDiscovery | null> => {
  return apiGet(`/discoveries/${playerId}`);
};