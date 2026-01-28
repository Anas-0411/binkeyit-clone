import SummaryApis from "../api/SummaryApis";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApis.userDetails,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export default fetchUserDetails;
