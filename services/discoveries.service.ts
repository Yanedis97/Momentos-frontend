import { apiGet } from "./api";

export async function getDiscovery(playerId: string) {
  return apiGet(`/discoveries/${playerId}`);
}
