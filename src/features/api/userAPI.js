import axios from "axios";

export const ChangeOwnName = async (name, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };
    const response = await axios.post("/api/user/me/name", { name }, config);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const ChangeOwnPass = async (password, newPassword, userAuth) => {
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      "/api/user/me/password",
      {
        password,
        newPassword,
      },
      config
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = async (params , userAuth) => {
  try {
    const config = {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.get("/api/user", config);

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const UpdateUserStatus = async (user_id, status, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/user/${user_id}/status`,
      {
        status,
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

export const ResetUserPass = async (user_id, new_user_password, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/user/${user_id}/password`,
      {
        password: new_user_password,
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

export const CreateNewUser = async (
  username,
  password,
  name,
  role,
  userAuth
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      "/api/user",
      {
        username,
        password,
        name,
        role,
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
