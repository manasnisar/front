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
import { Link } from "react-router-dom";
import { BannerText } from "../../shared/components/Banner/Styles";
import { AuthPage } from "../Styles";
import { FieldGroup } from "../../shared/components/Form/Styles";

const SignUp = props => {
  const [{ isSigningIn }, signIn] = useApi.post("/signin");
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

  const onSignUpFormSubmit = data => {
    props.loginUserAsync(data, props.history);
  };

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
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordAgain: "",
              organization: ""
            }}
            validations={{
              firstName: Form.is.required(),
              lastName: Form.is.required(),
              email: [Form.is.required(), Form.is.email()],
              password: Form.is.required(),
              passwordAgain: Form.is.required(),
              organization: Form.is.required()
            }}
            onSubmit={async (values, form) => {
              // try {
              //     await createIssue({
              //         ...values,
              //         status: IssueStatus.BACKLOG,
              //         projectId: project.id,
              //         users: values.userIds.map(id => ({ id })),
              //     });
              //     await fetchProject();
              //     toast.success('Issue has been successfully created.');
              //     onCreate();
              // } catch (error) {
              //     Form.handleAPIError(error, form);
              // }
            }}
          >
            <FormElement>
              <FormHeading>Sign up for your account</FormHeading>
              <FieldGroup>
                <Form.Field.Input name="firstName" placeholder="First name" />
                <Form.Field.Input name="lastName" placeholder="Last name" />
              </FieldGroup>

              <Form.Field.Input name="email" placeholder="Email" />
              <Form.Field.Input
                name="password"
                placeholder="Password"
                type="password"
              />
              <Form.Field.Input
                name="passwordAgain"
                placeholder="Retype password"
                type="password"
              />
              <Form.Field.Input
                name="organization"
                placeholder="Organization name"
              />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isSigningIn}
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
