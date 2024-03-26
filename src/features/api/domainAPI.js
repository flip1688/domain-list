import axios from "axios";

export const CreateNewDomain = async (name, amount, remarks, status, userAuth) => {
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
        status,
        remarks,
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

export const fetchDomains = async (params ,userAuth) => {

  try {
    const config = {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.get("/api/domain", config);

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateDomainName = async (domain_id, name, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${domain_id}/name`,
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

export const updateDomainAmount = async (domain_id, amount, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${domain_id}/amount`,
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

export const updateDomainRemarks = async (domain_id, remarks, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${domain_id}/remarks`,
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

export const updateDomainStatus = async (domain_id, status, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/domain/${domain_id}/status`,
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
