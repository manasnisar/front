import React from "react";

import { Form } from "../../shared/components";
import {
  ActionButton,
  Actions,
  Divider,
  FormElement,
  FormHeading
} from "../../Project/IssueCreate/Styles";
import EntryCard from "../../shared/components/EntryCard/EntryCard";
import useApi from "../../shared/hooks/api";
import HalfScreen from "../../shared/components/HalfSide";
import Mangekyo from "../../shared/components/Loaders/Mangekyo";
import SharinganBanner from "../../shared/components/Banner";
import { Link, useHistory } from "react-router-dom";
import { BannerText } from "../../shared/components/Banner/Styles";
import { AuthPage } from "../Styles";
import toast from "../../shared/utils/toast";

const SignIn = props => {
  const [{ isCreating }, signIn] = useApi.post("/auth/login");
  const history = useHistory();

  // useEffect(() => {
  //     if (props.isAuthenticated) {
  //         if (props.user.role === "admin") {
  //             props.history.push("/admin")
  //         } else {
  //             props.history.push("/home")
  //         }
  //
  //     }
  // }, [props.isAuthenticated, props.history, props.user])
  return (
    <AuthPage>
      <HalfScreen variant="left">
        <Mangekyo />
        <BannerText>WE SEE IT ALL!</BannerText>
      </HalfScreen>
      <HalfScreen variant="right">
        <SharinganBanner />
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              email: "",
              password: ""
            }}
            validations={{
              email: [Form.is.required(), Form.is.email()],
              password: Form.is.required()
            }}
            onSubmit={async (values, form) => {
              try {
                await signIn({
                  ...values
                });
                history.push("/project");
              } catch (error) {
                toast.error(error);
                Form.handleAPIError(error, form);
              }
            }}
          >
            <FormElement>
              <FormHeading>Sign in to your account</FormHeading>

              <Form.Field.Input name="email" placeholder="Email" />
              <Form.Field.Input
                name="password"
                placeholder="Password"
                type="password"
              />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  <Link style={{ color: "white" }} to="/project">
                    Log In
                  </Link>
                </ActionButton>
              </Actions>
              <Divider />
              <span>
                Don't have an account?
                <Link to="/signup">Sign up</Link>
              </span>
            </FormElement>
          </Form>
        </EntryCard>
      </HalfScreen>
    </AuthPage>
  );
};

export default SignIn;
