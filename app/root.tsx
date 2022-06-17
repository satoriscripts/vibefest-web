import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { HeaderSimple } from "./components/Header";

export const vibefestColor = "#ea3c79";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "VIBEFEST「VOL. 2」",
  viewport: "width=device-width,initial-scale=1",
});

const links = [
  {
    link: "/",
    label: "Home",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineTheme>
          <HeaderSimple links={links} />
          <Outlet />
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
                src: `url(./fonts/Akira_Expanded.ttf)`,
                fontWeight: 700,
                fontStyle: "normal",
              },
            },
            {
              ".box": {
                background: "hsl(0, 0%, 100%)",
                padding: "10px 20px",
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.01)",

                "&::after": {
                  position: "absolute",
                  content: `""`,
                  top: "10px",
                  left: 0,
                  right: 0,
                  zIndex: -1,
                  height: "100%",
                  width: "100%",
                  transform: "scale(0.9) translateZ(0)",
                  filter: "blur(15px)",
                  background:
                    "linear-gradient(to left, #ff5770, #e4428d, #c42da8, #9e16c3, #6501de, #9e16c3, #c42da8, #e4428d, #ff5770)",
                  backgroundSize: "200% 200%",
                  animation: "animateGlow 1.25s linear infinite",
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

              "h1, h2, h3, h4": {
                fontFamily: "Akira Expanded",
                color:
                  theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
              },
              ".mantine-Text-root": {
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
