import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { fbt, IntlVariations, setupFbtee } from "fbtee";
import AvailableLanguages from "~/components/AvailableLanguages";
import { LocaleSwitcher } from "~/components/LocaleSwitcher";
import { ja_JP } from "~/translations/ja_JP.json";

setupFbtee({ translations: {} });

const getLocale = createServerFn({ method: "GET" }).handler(async () => {
  const request = getWebRequest();
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split("=");
    if (key === "locale") {
      const locale = decodeURIComponent(rest.join("="));

      if (!AvailableLanguages.get(locale)) {
        return "en_US";
      }

      return locale;
    }
  }

  return null;
});

export const Route = createFileRoute("/{-$locale}")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: fbt("Hello, World!", "Greeting").toString() }],
  }),
  loader: async ({ params }) => {
    const locale = await getLocale();

    if (!locale) {
      return;
    }

    if (params.locale === undefined && locale === "en_US") {
      return;
    }

    if (params.locale !== locale) {
      // If the locale from the URL doesn't match the cookie, redirect
      throw redirect({ to: ".", params: { locale } });
    }
  },
});

function RouteComponent() {
  let locale = Route.useParams({ select: (state) => state.locale }) ?? "en_US";

  if (!AvailableLanguages.get(locale)) {
    locale = "en_US";
  }

  console.log("Setting up fbtee with locale", locale);

  setupFbtee({
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale,
      }),
    },
    translations: {
      ja_JP,
    },
  });

  return (
    <>
      <header className="flex flex-row gap-x-2 items-center">
        <Link to="/{-$locale}">/</Link>
        <Link to="/{-$locale}/test/example">/test/example</Link>
      </header>
      <Outlet />
      <LocaleSwitcher />
    </>
  );
}
