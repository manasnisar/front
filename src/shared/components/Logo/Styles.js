import styled from "styled-components";
import Logo from "./mangekyo-logo.png";

export const StyledLogo = styled.div`
  background-image: url(${Logo});
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-size: 40px;
  background-repeat: no-repeat;
`;
