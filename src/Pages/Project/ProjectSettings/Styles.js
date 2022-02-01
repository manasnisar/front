import styled from "styled-components";

import { font } from "../../../shared/utils/styles";
import { Button, Form } from "../../../shared/components";

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
