import axios from "axios";

export const loginUser = async (email, password) => {
    console.log(email,password);
    console.log(process.env.REACT_APP_VALID_EMAIL,process.env.REACT_APP_VALID_PASSWORD);
    
  if (
    email !== process.env.REACT_APP_VALID_EMAIL ||
    password !== process.env.REACT_APP_VALID_PASSWORD
  ) {
    throw new Error("Invalid email or password!");
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw new Error("Login failed! Please try again.");
  }
};
