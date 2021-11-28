import React from "react";

import Spinner from "../../../shared/components/Spinner";

import StyledPageLoader from "./Styles";
import Mangekyo from "../Loaders/Mangekyo";

const PageLoader = () => (
  <StyledPageLoader>
    <Mangekyo size={100} />
  </StyledPageLoader>
);

export default PageLoader;
