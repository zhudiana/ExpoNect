import importer from "../api/importer";

const catchError = (error) => {
  if (error?.response?.data) {
    return error.response.data;
  }
  return { success: false, error: error.message };
};

export const signup = async (values) => {
  try {
    const { data } = await importer.post("/importers/create", {
      ...values,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signin = async (values) => {
  try {
    const { data } = await importer.post("/importers/login", {
      ...values,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const forgetPassword = async (email) => {
  try {
    const { data } = await importer.post("/importers/forgot-password", {
      email,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export default catchError;
