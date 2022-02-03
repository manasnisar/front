import styled from "styled-components";

import { font } from "../../shared/utils/styles";
import { Button, Form } from "../../shared/components";
import { sizes } from "../../shared/utils/styles";

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormElement = styled(Form.Element)`
  width: 100%;
`;

export const FormHeading = styled.h1`
  padding: 20px 0 10px;
  ${font.size(24)}
  ${font.medium}
`;

export const ActionButton = styled(Button)`
  margin-top: 30px;
`;

const paddingLeft = sizes.appNavBarLeftWidth + 50;

export const AccountPage = styled.div`
  padding: 30px 50px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
