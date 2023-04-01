import axios from "axios";
import { API_URL, API_URL_AMAZON, API_URL_FILE } from "../../Constants";

// Register user
const createFile = async (fileData) => {
  const responseFile = await axios.post(API_URL_AMAZON, fileData);

  console.log("responseFile", responseFile.data);
  // console.log(acct, perm);
  return responseFile.data;
};

const fileService = {
  createFile,
};
export default fileService;
