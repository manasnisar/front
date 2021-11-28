import React, { useEffect } from "react";

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

const SignUp = props => {
  const [{ isCreating }, signUp] = useApi.post("/auth/register");
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
        <BannerText>LET US WATCH IT FOR YOU!</BannerText>
      </HalfScreen>
      <HalfScreen variant="right">
        <SharinganBanner />
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordAgain: "",
              organization: "",
              role: "member"
            }}
            validations={{
              name: Form.is.required(),
              email: [Form.is.required(), Form.is.email()],
              password: Form.is.required(),
              organization: Form.is.required(),
              role: Form.is.oneOf(["owner", "member"])
            }}
            onSubmit={async (values, form) => {
              const { passwordAgain, ...payload } = values;
              try {
                await signUp({
                  ...payload
                });
                toast.success("User created successfully!");
                setTimeout(() => {
                  history.push("/signin");
                }, 2000);
              } catch (error) {
                toast.error(error);
              }
            }}
          >
            <FormElement>
              <FormHeading>Sign up for your account</FormHeading>
              <Form.Field.Input name="name" placeholder="Full name" />
              <Form.Field.Input name="email" placeholder="Email" />
              <Form.Field.Input
                name="password"
                placeholder="Password"
                type="password"
              />
              <Form.Field.Input
                name="organization"
                placeholder="Organization name"
              />
              <Form.Field.Select
                name="role"
                options={[
                  {
                    value: "member",
                    label: "Member"
                  },
                  {
                    value: "owner",
                    label: "Owner"
                  }
                ]}
                variant="simple"
              />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  Sign up
                </ActionButton>
              </Actions>
              <Divider />
              <span>
                Already have an account?
                <Link to="/signin">Sign in</Link>
              </span>
            </FormElement>
          </Form>
        </EntryCard>
      </HalfScreen>
    </AuthPage>
  );
};
export default SignUp;
