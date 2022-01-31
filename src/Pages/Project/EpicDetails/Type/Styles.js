import styled from "styled-components";

import { color, font } from "../../../../shared/utils/styles";
import { Button } from "../../../../shared/components";

export const Type = styled.div`
  display: flex;
  align-items: center;
`;

export const EpicNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeLabel = styled.div`
  padding: 0 5px 0 7px;
  ${font.size(15)}
`;
