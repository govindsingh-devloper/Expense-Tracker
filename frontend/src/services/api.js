const BASE_URL=process.env.REACT_APP_BASE_URL


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }

export const transactionEndpoints={
  ADD_TRANSACTION_API:BASE_URL + "/auth/createTransaction",
  GET_TRANSACTION_API:BASE_URL+ "/auth/getSingleTransaction",
  EDIT_TRANSACTION_API:BASE_URL + "/auth/updateTransaction",
  DELETE_TRANSACTION:BASE_URL +"/auth/deleteTransaction"
}