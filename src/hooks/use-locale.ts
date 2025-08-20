import { useParams } from "@tanstack/react-router";
import AvailableLanguages from "~/components/AvailableLanguages";

export function useLocale() {
  let locale =
    useParams({
      from: "/{-$locale}",
      shouldThrow: false,
      select: (params) => params.locale,
    }) ?? "en_US";

  if (!AvailableLanguages.get(locale)) {
    locale = "en_US";
  }

  return locale;
}
