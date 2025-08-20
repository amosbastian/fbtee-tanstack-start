import { HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { useLocale } from "~/hooks/use-locale";
import { LocaleContext } from "./locale";

type RootComponentProps = {
  children: ReactNode;
};

export function RootComponent(props: RootComponentProps) {
  return (
    <LocaleContext>
      <Root {...props} />
    </LocaleContext>
  );
}

function Root(props: RootComponentProps) {
  const { children } = props;
  const locale = useLocale();
  const serverURL = import.meta.env.VITE_ZERO_SERVER;
  const isRTL = ["ar", "he", "fa"].includes(locale || "");

  return (
    <html lang={locale} suppressHydrationWarning dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <link href={serverURL} rel="preconnect" />
        <HeadContent />
      </head>
      <body className="font-regular tracking-wide antialiased">
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
