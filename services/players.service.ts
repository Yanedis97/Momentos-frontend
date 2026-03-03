import { apiGet, apiPost, apiPut } from "./api";
import { Player } from "@/types/players";

export const getPlayers = async (): Promise<Player[]> => {
  return apiGet("/players/");
};

export const getPlayer = async (PlayerId: string): Promise<Player> => {
  return apiGet(`/players/${PlayerId}`);
};

export const createPlayer = async (Player: Player) => {
  return apiPost("/players/", Player);
};

export const createGroupPlayers = async (Players: Player[]) => {
  return apiPost("/players/create_all", Players);
};

export const updatePlayer = async (
  PlayerId: string,
  data: Partial<Player>
) => {
  return apiPut(`/players/${PlayerId}`, data);
};