import React from "react";
import { Section } from "../commons/styled";
import Navigation from "./Navigation";

const Template: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      <Section>{children}</Section>
    </>
  );
};

export default Template;
