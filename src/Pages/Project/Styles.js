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
  margin-top: 20px;
  display: flex;
  min-height: 32px;
  justify-content: space-between;
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
  span {
    color: #5e6c84;
    font-size: 15px;
  }
`;

export const ActionContainer = styled.div`
  gap: 10px;
  display: flex;
`;
