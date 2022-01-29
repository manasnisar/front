import styled from "styled-components";

import { font } from "../../../../shared/utils/styles";

export const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
`;

export const ActionContainer = styled.div`
  gap: 10px;
  display: flex;
`;
