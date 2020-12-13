import styled from "styled-components";
import { Color } from "./constant";
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "70px",
});

export const Logo = styled.img.attrs({
  src: "https://image.flaticon.com/icons/png/512/39/39379.png",
  alt: "logo",
})({
  width: "auto",
  height: "50px",
  margin: "0 10px",
  cursor: "pointer",
});

export const Button = styled.button({
  background: Color.default,
  color: Color.sub,
  cursor: "pointer",
  padding: "12px 16px",
  height: "42px",
  outline: "none",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  transition: ".2s ease-in-out",
  margin: "0 10px",
  "&:hover": {
    background: Color.point,
  },
});
