import SummaryApis from "../common/SummaryApis";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApis.userDetails,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
