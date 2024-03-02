import axios from "axios";

export const CreatePayment = async (time, domainId, amount, remarks, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      "/api/payment",
      {
        time,
        domainId,
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

export const fetchPayments = async (params,userAuth) => {

  try {
    const config = {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.get(`/api/payment`, config);

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updatePaymentTime = async (payment_id, time, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/payment/${payment_id}/time`,
      { time },
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

export const updatePaymentAmount = async (payment_id, amount, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/payment/${payment_id}/amount`,
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

export const updatePaymentRemarks = async (payment_id, remarks, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/payment/${payment_id}/remarks`,
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

export const updatePaymentDomain = async (payment_id, domainId, userAuth) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth.accessToken}`,
      },
    };

    const response = await axios.post(
      `/api/payment/${payment_id}/domain`,
      { domainId },
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
