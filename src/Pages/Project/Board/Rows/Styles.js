import styled from "styled-components";
import { color } from "../../../../shared/utils/styles";

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  .Collapsible {
    width: 100%;
  }
`;

export const Trigger = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  text-align: center;
  color: ${color.textMedium};
`;
