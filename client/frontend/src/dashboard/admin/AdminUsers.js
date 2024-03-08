import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AdminSidebar from "./components/AdminSidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/admin-users`
      );
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching users:", data.error);
        return;
      }

      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const deleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/admin-delete-user`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id }),
          }
        );

        fetchAllUsers();
        // You might want to avoid using window.location.reload() for a smoother user experience
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-between">
        <AdminSidebar />

        <div className="w-5/6 p-5">
          <div className="mt-5">
            <h2 className="font-semibold text-lg">Users</h2>

            <div className="mt-5 overflow-hidden">
              <div className="overflow-auto">
                <table className="table-auto w-full overflow-auto bg-white shadow-md rounded-xl">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Username</th>
                      <th className="px-4 py-2">Wallet Address</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">
                          <img src={user.avatar} className="w-10 h-10" alt="" />
                        </td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.username}</td>
                        <td className="border px-4 py-2">
                          {user.walletAddress}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => deleteUser(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
