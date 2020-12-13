import styled from "styled-components";
import { mediaMobile, mediaTablet } from "./utill";

export const Section = styled.section({
  width: "100%",
  height: "100%",
});

export const Article = styled.article({
  width: "1150px",
  height: "700px",
  margin: "auto",
  background: "aqua",
  ...mediaTablet({
    width: "768px",
  }),
  ...mediaMobile({
    width: "100%",
  }),
});

export const Nav = styled.nav({
  width: "100%",
  height: "70px",
  background: "yellow",
});
