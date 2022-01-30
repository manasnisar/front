import styled from "styled-components";
import { color } from "../../../shared/utils/styles";

export const Rows = styled.div`
  display: flex;
  margin: 5px 0;
  flex-direction: column;

  .Collapsible {
    width: 100%;
    margin-top: 10px;
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
