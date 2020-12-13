import React, { useEffect, useState } from "react";
import { Section } from "../commons/styled";
import Navigation from "./Navigation";

const Template: React.FunctionComponent = ({ children }) => {
  const [isMobi, setIsMobi] = useState(window.innerWidth < 768);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsMobi(true);
      } else {
        setIsMobi(false);
      }
    });
  }, []);
  return (
    <>
      <Navigation isMobi={isMobi} />
      <Section>{children}</Section>
    </>
  );
};

export default Template;
