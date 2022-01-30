import styled from "styled-components";
import { color, font, mixin } from "../../../shared/utils/styles";

export const Titles = styled.div`
  display: flex;
  border-radius: 3px;
  gap: 10px;
`;

export const Title = styled.div`
  padding: 13px 10px 17px;
  background: ${color.backgroundLightest};
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)};
  width: 50%;
  ${mixin.truncateText}
`;

export const IssuesCount = styled.span`
  text-transform: lowercase;
  ${font.size(13)};
`;
