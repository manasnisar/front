import React from "react";
import { HalfSide } from "./Styles";
import PropTypes from "prop-types";

function HalfScreen({ variant, children }) {
  const propTypes = {
    variant: PropTypes.oneOf(["left", "right"])
  };
  return <HalfSide variant={variant}>{children}</HalfSide>;
}

export default HalfScreen;
