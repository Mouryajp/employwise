import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4 border-2 p-2 rounded-xl w-full">
        <div className="w-1/3"></div>
        <h2 className="text-2xl font-semibold w-1/3 flex justify-center ">Users List</h2>
        <div className="w-1/3 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4  ">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-xl shadow-md bg-white hover:scale-105 transition-transform duration-300">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="text-xl text-center font-semibold mt-2">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-center text-gray-500">{user.email}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="mx-2 px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="mx-2 px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
