import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
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

export const vibefestColor = "#ea3c79";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "VIBEFEST「VOL. 2」",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineTheme>
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
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
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
              "h1, h2, h3, h4": {
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
