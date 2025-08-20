import { useNavigate } from "@tanstack/react-router";
import { useLocaleContext } from "fbtee";
import { useLocale } from "~/hooks/use-locale";
import AvailableLanguages from "./AvailableLanguages";
import * as React from "react";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const [_, startTransition] = React.useTransition();
  const { setLocale } = useLocaleContext();
  const navigate = useNavigate();

  async function onValueChange(value: string) {
    startTransition(async () => {
      setLocale(value);
      document.cookie = `locale=${value}; path=/; max-age=${
        365 * 24 * 60 * 60
      }`;
      await navigate({
        to: ".",
        params: {
          locale: value === "en_US" ? undefined : value,
        },
        reloadDocument: true,
      });
    });
  }

  return (
    <button
      className="cursor-pointer text-pink-500 underline select-none hover:no-underline dark:text-pink-400"
      onClick={() => onValueChange(locale === "ja_JP" ? "en_US" : "ja_JP")}
    >
      {AvailableLanguages.get(locale === "ja_JP" ? "en_US" : "ja_JP")}
    </button>
  );
};
