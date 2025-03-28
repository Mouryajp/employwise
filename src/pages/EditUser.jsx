import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => {
      const data = res.data.data;
      setUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setMessage("User updated successfully!");
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit User</h2>
        {message && <p className="text-green-500 text-center">{message}</p>}
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <div className="flex gap-3">
            <button
              className="w-full  border-2 p-2 rounded hover:bg-gray-200"
              onClick={() => navigate("/users")}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
