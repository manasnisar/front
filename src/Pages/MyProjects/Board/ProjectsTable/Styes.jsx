import styled from "styled-components";
import { Icon } from "../../../../shared/components";

export const GridContainer = styled.div`
  padding-top: 50px;

  .pointer {
    cursor: pointer;
  }
`;

export const ProjectRow = styled.div`
  cursor: pointer;
`;

export const TypeIcon = styled(Icon)`
  color: ${props => props.color};
`;
