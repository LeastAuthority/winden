import Bowser from "bowser";

const browser = Bowser.getParser(self.navigator.userAgent);
export const browserIsProbablySafari = browser.satisfies({
  safari: ">0",
});
