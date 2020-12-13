import { CSSObject } from "styled-components";

export const mediaTablet = (css: CSSObject) => {
  return {
    "@media(max-width: 1150px)": css,
  };
};

export const mediaMobile = (css: CSSObject) => {
  return {
    "@media(max-width: 768px)": css,
  };
};
