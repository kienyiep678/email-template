import axios from "axios";
import { API_URL, API_URL_FILE } from "../../Constants";

// Register user
const createEmail = async (formData) => {
  console.log("user data", formData);

  const response1 = await axios.post(API_URL, formData);

  console.log("response123", response1);
  // console.log(acct, perm);
  return response1.data;
};

const emailService = {
  createEmail,
};

export default emailService;
