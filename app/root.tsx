import type { ColorScheme } from "@mantine/core";
import {
  Button,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { HelixStream } from "@twurple/api";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { useState } from "react";
import { HeaderSimple } from "./components/Header";
import type { sessionType } from "./global/typings";
import { authenticator } from "./services/auth.server";
// @ts-ignore creator didn't include types `@types/react-twitch-embed` >:( i also dont think that they maintain it anymore sooooooooo!!!!!!!!
import { TwitchPlayer } from "react-twitch-embed";

export const vibefestColor = "#ea3c79";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "VIBEFEST",
  viewport: "width=device-width,initial-scale=1",

  // Twitter Card
  "twitter:card": "summary",
  "twitter:site": "@VIBEFEST22",
  "twitter:title": "VIBEFEST",
  "twitter:description": "VIBEFEST",
  "twitter:image": "https://vibefest.live/VibefestFlower.png",

  // Open Graph Tags
  "og:title": "VIBEFEST",
  "og:description": "VIBEFEST",
  "og:type": "website",
  "og:url": "https://vibefest.live",
  "og:image": "https://vibefest.live/VibefestFlower.png",
});

const links = [
  {
    link: "/",
    label: "Home",
  },
  { link: "/news", label: "News" },
  { link: "/stream", label: "Stream" },
  { link: "/guestbook", label: "Guestbook" },
  { link: "/donate", label: "Donate" },
];

export let loader: LoaderFunction = async ({ request }) => {
  const clientId = process.env.TWITCH_CLIENT_ID ?? "";
  const accessToken = process.env.TWITCH_SECRET ?? "";

  const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });

  let [session, stream]: [sessionType | null, HelixStream | null] =
    await Promise.all([
      authenticator.isAuthenticated(request),
      apiClient.streams.getStreamByUserId("788286383"),
    ]);

  return { session, isLive: stream !== null };
};

function toggleStream() {
  var x = document.getElementById("stream");
  if (x) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } else {
    return;
  }
}

export default function App() {
  const { session, isLive } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta name="theme-color" content="#e84270" media="not screen" />
        <Links />
      </head>
      <body>
        <MantineTheme>
          <NotificationsProvider>
            <HeaderSimple session={session} links={links} />
            {isLive ? (
              <div
                className="opacityHover"
                style={{
                  position: "fixed",
                  bottom: 0,
                  right: 0,
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
              >
                <TwitchPlayer
                  channel="vibefestlive"
                  theme="dark"
                  width="300"
                  height="200"
                  id="stream"
                  onVideoPause={() => console.log(":(")}
                  style={{
                    display: "Block",
                  }}
                />
                <Button
                  style={{ float: "right" }}
                  mt="sm"
                  onClick={toggleStream}
                >
                  Toggle Stream
                </Button>
              </div>
            ) : (
              ""
            )}
            <Outlet />
          </NotificationsProvider>
        </MantineTheme>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global
          styles={(theme) => [
            {
              "@font-face": {
                fontFamily: "Akira Expanded",
                src: `url(/fonts/Akira_Expanded.ttf)`,
                fontWeight: 700,
                fontStyle: "normal",
              },
            },
            {
              ".backgroundHover": {
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  transition: "background-color 0.2s ease-in-out",
                },
              },
              ".opacityHover": {
                opacity: 0.5,
                "&:hover": {
                  opacity: 1,
                  transition: "opacity 0.2s ease-in-out",
                },
              },
              ".box": {
                background: "hsl(0, 0%, 100%)",
                padding: "10px 20px",
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.01)",

                "&::after": {
                  position: "absolute",
                  content: `""`,
                  // top: "10px",
                  left: 0,
                  right: 0,
                  zIndex: -1,
                  height: "100%",
                  width: "100%",
                  transform: "scale(1) translateZ(0)",
                  filter: "blur(15px)",
                  background:
                    // v i tried to do different colors here and it didn't work v
                    // "linear-gradient(to left, #89dcdc, #db9ec8, #ffffff, #db9ec8, #89dcdc, #89dcdc, #db9ec8, #fffffff, #db9ec8)",
                    "linear-gradient(to left, #ff5770, #e4428d, #c42da8, #9e16c3, #6501de, #9e16c3, #c42da8, #e4428d, #ff5770)",
                  backgroundSize: "200% 200%",
                  animation: "animateGlow 2s linear infinite",
                },
              },
              "@keyframes animateGlow": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },

                "100%": {
                  backgroundPosition: "200% 50%",
                },
              },

              ".VIBEFEST_FONT": {
                fontFamily: "Akira Expanded",
                color:
                  theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
              },
              a: {
                color:
                  theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
                textDecoration: "underline",

                "&:hover": {
                  backgroundColor: vibefestColor,
                  textDecoration: "none",
                  border: "none",
                  color: theme.colorScheme === "light" ? "white" : "",
                },
              },
            },
          ]}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
