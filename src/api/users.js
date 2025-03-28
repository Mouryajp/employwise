import axios from "axios";


// Fetch users
export const getUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Failed to fetch users";
  }
};

// Update user details
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      userData
    );
    console.log("UserDATA:", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Failed to update user";
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    console.log("deleteUser", id);

    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
  } catch (error) {
    throw error.response.data.error || "Failed to delete user";
  }
};
