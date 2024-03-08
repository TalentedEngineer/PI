import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  EnvelopeOpenIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatUser } from "../../../../redux/slices/ChatSlice";

const ChatUsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const chatUser = useSelector((state) => state.chat.selectedChatUser);
  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/chatUsers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({ userid: user._id }),
      }
    );
    const data = await res.json();
    if (data.error) {
      setUsers([]);
      return;
    }
    setUsers(data.users);
    console.log(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const dispatch = useDispatch();
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    dispatch(setSelectedChatUser(user));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl w-full h-full overflow-y-auto custom-scrollbar">
      <div className="sticky top-0 left-0 w-full z-50 bg-white p-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="text-sm rounded-xl pl-8 block w-full p-2.5 bg-gray-100 outline-none border ring-purple-700 focus:ring-2 focus:bg-transparent hover:bg-gray-200 hover:bg-opacity-70"
            placeholder="Search Chat..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group bg-gray-100 hover:bg-gray-200 rounded-xl p-2 text-sm text-gray-800 font-semibold flex items-center gap-2">
                <div>All Messages</div>
                <div>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 -mt-0 w-32 origin-top-right rounded-md bg-white shadow-lg focus:outline-none p-0 overflow-hidden text-sm">
                <div>
                  <Menu.Item>
                    <button className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                      All Messages
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                      Unread
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                      Starred
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                      Spam
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <ul className="pb-3">
          {filteredUsers.map((user, index) => (
            <li
              className={`hover:bg-gray-100 p-3 cursor-pointer rounded-md ${
                chatUser && chatUser._id === user._id && "bg-gray-200"
              }`}
              key={index}
              onClick={() => handleUserSelect(user)}
            >
              <div className="w-full block">
                <div className="flex items-center gap-3 w-full justify-between text-start text-gray-800 text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="relative">
                      <span className="absolute w-3 h-3 rounded-full bottom-1 right-0 bg-green-500 z-40 ring-2 ring-white"></span>
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-gray-500">
                        Ok, I will send details.
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-500 gap-2">
                    <span className="text-xs">1 week</span>
                    <div className="flex gap-1 items-center justify-end">
                      <button className="hover:text-gray-800">
                        <EnvelopeOpenIcon className="w-5 h-5" />
                      </button>
                      <button className="hover:text-gray-800">
                        <StarIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <span className="text-gray-500">No Chats Found</span>
        </div>
      )}
    </div>
  );
};

export default ChatUsersList;
