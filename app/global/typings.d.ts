import type { OAuth2Profile, TwitchSession } from "~/services/oauth.strategy";

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
  session: OAuth2Profile | null;
}

export interface sessionType {
  provider: string;
  json: TwitchSession;
}
