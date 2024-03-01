import axios from "axios";

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