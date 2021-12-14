import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../shared/utils/api";
import toast from "../shared/utils/toast";
import { getStoredAuthToken } from "../shared/utils/authToken";
import { PageLoader } from "../shared/components";

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!getStoredAuthToken()) {
        history.push("/signin");
      }
      try {
        const { user } = await api.get("/auth");
        if (user) {
          history.push("/myprojects");
        }
      } catch (e) {
        history.push("/signin");
      }
    };
    checkAuthStatus();
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;
