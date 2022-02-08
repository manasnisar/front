import React from "react";
import useApi from "../../shared/hooks/api";
import HalfScreen from "../../shared/components/HalfSide";
import Mangekyo from "../../shared/components/Loaders/Mangekyo";
import SharinganBanner from "../../shared/components/Banner";
import { Link, useRouteMatch } from "react-router-dom";
import { BannerText } from "../../shared/components/Banner/Styles";
import { AuthPage } from "../Styles";
import { AfterVerification, VerifcationContainer } from "./Styles";

const VerifyAccount = () => {
  const match = useRouteMatch();
  const [{ error, isLoading }] = useApi.get(
    `/auth/verify_account/${match.params.token}`
  );

  return (
    <AuthPage>
      <HalfScreen variant="left">
        <Mangekyo />
        <BannerText>WE SEE IT ALL!</BannerText>
      </HalfScreen>
      <HalfScreen variant="right">
        <SharinganBanner />
        <VerifcationContainer>
          {isLoading
            ? "Verifying your account..."
            : error
            ? "Account verification failed!"
            : "Account verification successful!"}
        </VerifcationContainer>
        <AfterVerification>
          {!isLoading && error && (
            <span>
              <Link to="/signup"> Would you like to sign up?</Link>
            </span>
          )}
          {!isLoading && !error && (
            <span>
              <Link to="/signin">Click here to sign in</Link>
            </span>
          )}
        </AfterVerification>
      </HalfScreen>
    </AuthPage>
  );
};

export default VerifyAccount;
