import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AdminSidebar from "./components/AdminSidebar";

const AdminGigs = () => {
  const [gigs, setGigs] = useState([]);

  const fetchAllGigs = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/admin-gigs`
      );
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching gigs:", data.error);
        return;
      }

      setGigs(data);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  useEffect(() => {
    fetchAllGigs();
  }, []);

  const deleteGig = async (gig) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${gig.title.substring(0, 10)}...?`
      )
    ) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/admin-delete-gig`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gigId: gig._id }),
          }
        );

        const data = await res.json();
        if (data.error) {
          return console.log(data.error);
        }

        fetchAllGigs();
        // You might want to avoid using window.location.reload() for a smoother user experience
      } catch (error) {
        console.error("Error deleting gig:", error);
      }
    }
  };

  if (!gigs) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="flex justify-between">
        <AdminSidebar />

        <div className="w-5/6 p-5">
          <div className="mt-5">
            <h2 className="font-semibold text-lg">Gigs</h2>

            <div className="mt-5 overflow-hidden">
              <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Title</th>
                      <th className="py-2 px-4 border-b">Image</th>
                      <th className="py-2 px-4 border-b">User</th>
                      <th className="py-2 px-4 border-b">Category</th>
                      <th className="py-2 px-4 border-b">Created Date</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gigs.map((gig) => {
                      if (gig.user) {
                        return (
                          <tr key={gig._id}>
                            <td className="py-2 px-4 border-b">{gig.title}</td>
                            <td className="py-2 px-4 border-b">
                              <img
                                src={gig.images[0]}
                                className="w-10 h-10 object-cover rounded"
                                alt=""
                              />
                            </td>
                            <td className="py-2 px-4 border-b">
                              {gig.user.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {gig.category}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {gig.createdAt}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => deleteGig(gig)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
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

export default AdminGigs;
