/// <reference types="fbtee/ReactTypes.d.ts" />
/// <reference types="vite/client" />
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootComponent } from "~/provider/root";
import css from "~/styles/app.css?url";

export const Route = createRootRoute({
  component: RootDocument,
  head: () => ({
    links: [
      {
        href: css,
        rel: "stylesheet",
      },
    ],
    meta: [
      {
        charSet: "utf8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
    ],
  }),
});

function RootDocument() {
  return (
    <RootComponent>
      <Outlet />
    </RootComponent>
  );
}
