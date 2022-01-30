import styled from "styled-components";

import { sizes, font } from "../../shared/utils/styles";

const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const ProjectPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;

export const TitlesAndLists = styled.div`
  display: flex;
  flex-direction: column;
  margin: 26px 0;
`;

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
