import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "./oauth.strategy";
import { sessionStorage } from "./session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<any>(sessionStorage, {
  sessionKey: "sessionKey",
  sessionErrorKey: "sessionErrorKey",
});

// Twitch
authenticator.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.twitch.tv/oauth2/authorize",
      tokenURL: "https://id.twitch.tv/oauth2/token",
      callbackURL:
        process.env.CALLBACK_URL ||
        "http://localhost:3000/auth/twitch/callback",
      clientID: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_SECRET || "",
    },
    async ({ accessToken, refreshToken, extraParams, profile, context }) => {
      return await Promise.resolve({ ...profile });
    }
  )
);
