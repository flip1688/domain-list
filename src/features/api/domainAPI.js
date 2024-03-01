import axios from "axios";

export const CreateNewDomain = async (name, amount, remarks, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      "/api/domain",
      {
        name,
        amount,
        remarks
      },
      config
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchDomains = async (userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.get("/api/domain", config);

    if (response.status === 200) {
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateDomainName = async (user_id, name, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${user_id}/name`,
      { name },
      config
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateDomainAmount = async (user_id, amount, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${user_id}/amount`,
      { amount },
      config
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateDomainRemarks = async (user_id, remarks, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${user_id}/remarks`,
      { remarks },
      config
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateDomainStatus = async (user_id, status, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${user_id}/status`,
      { status },
      config
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    return false;
  }
};
