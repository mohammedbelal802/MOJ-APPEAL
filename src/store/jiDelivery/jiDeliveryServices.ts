import { apiClient } from "../../api";

const getJideliveryVerificationCase = async (data: {
  caseNumber: string;
  year: string;
}) => {
  const response = await apiClient.post(
    "/get-ji-delivery-verfication-case",
    data
  );
  return response.data;
};

const jiDeliveryVerificationServices = { getJideliveryVerificationCase };
export default jiDeliveryVerificationServices;
