import { createLocaleContext, useLocaleContext } from "fbtee";
import * as React from "react";
import AvailableLanguages from "~/components/AvailableLanguages";

const ClientLocaleContext = ({ children }: { children: React.ReactNode }) => {
  const { locale, setLocale } = useLocaleContext();
  const [_, startTransition] = React.useTransition();

  React.useEffect(() => {
    // @ts-expect-error
    window.cookieStore.get("locale").then(({ value: maybeLocale }) => {
      if (maybeLocale && maybeLocale !== locale) {
        startTransition(() => {
          setLocale(maybeLocale);
          document.cookie = `locale=${maybeLocale}; path=/; max-age=${
            365 * 24 * 60 * 60
          }`;
        });
      }
    });
  }, []);

  return children;
};

const loadLocale = async (locale: string) => {
  console.log(`Loading locale "${locale}"`);

  if (!AvailableLanguages.get(locale)) {
    return {};
  }

  try {
    const result = (await import(`../translations/${locale}.json`)).default[
      locale
    ];
    return result;
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error);
    return {};
  }
};

const FbteeLocaleContext = createLocaleContext({
  availableLanguages: AvailableLanguages,
  clientLocales: [...navigator.languages, navigator.language],
  loadLocale,
});

export function LocaleContext({ children }: { children: React.ReactNode }) {
  return (
    <FbteeLocaleContext>
      <ClientLocaleContext>{children}</ClientLocaleContext>
    </FbteeLocaleContext>
  );
}
