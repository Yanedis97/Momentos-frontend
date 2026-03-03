export interface Preferences {
  show_paused_first: boolean;
}

export interface Profile {
  language: string;
  experience_level: string;
  preferences: Preferences;
}

export interface Player {
  id?: string;
  username: string;
  email: string;
  created_at: string;
  last_login?: string | null;
  status: string;
  profile: Profile;
}