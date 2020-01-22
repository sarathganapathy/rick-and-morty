/* globals window */
// different languages
import enUs from "./en-us";

// global locale string
const locale = window.localeString;

const i18n = {
  en_US: enUs
  // add other languages
}[locale || "en_US"];

export default i18n;
