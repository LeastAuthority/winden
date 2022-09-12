import Bowser from "bowser";

export function isValidBrowser() {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return !browser.satisfies({
    ios: {
      firefox: ">=0",
      safari: "<=14.4",
    },
    mobile: {
      samsung_internet: ">=0",
    },
  });
}
