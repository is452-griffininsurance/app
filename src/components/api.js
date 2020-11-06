import axios from "axios";

const API_URL = "https://api.is452.cloud/";
const walletAddress = "0x476F44118B3334444e2991B8e3450b855471db6d".toLowerCase();

export const getAllTransactions = () => {
  return axios
    .get(`${API_URL}get_user_transactions?user_wallet_address=${walletAddress}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllInsurance = () => {
  return axios
    .get(`${API_URL}get_insurance_by_user?user_wallet_addr=${walletAddress}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllFlightInsurances = () => {
  return axios
    .get(`${API_URL}get_all_insurances?insurance_type=flight_delay&status=open`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInsuranceByID = (id) => {
  return axios
    .get(`${API_URL}get_insurance_by_id?insurance_id=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
