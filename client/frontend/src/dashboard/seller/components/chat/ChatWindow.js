import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  EnvelopeOpenIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  StarIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIstyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("user-disconnected", (disconnectedUserId) => {
      // setMessages([]);
      fetchChatHistory();
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  };

  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector((state) => state.chat.selectedChatUser);

  const fetchChatHistory = async (chatId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/message/chat-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({
            sender: user._id,
            receiver: selectedUser._id,
            chatId,
          }),
        }
      );
      const data = await response.json();
      console.log(data.messages);
      if (data.error) {
        setMessages([]);
        return;
      }
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const [selectedChatId, setSelectedChatId] = useState(null); // Store chatId

  const fetchChatId = async (senderId, receiverId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/message/fetch-chat-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({
            senderId,
            receiverId,
          }),
        }
      );

      const data = await response.json();
      return data.chatId;
    } catch (error) {
      console.error("Error fetching chat ID:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check if a chat exists between the users
    // If not, create a new chat and get its ID
    if (user && selectedUser) {
      fetchChatId(user._id, selectedUser._id)
        .then((data) => {
          setSelectedChatId(data);
          fetchChatHistory(data);
        })
        .catch((error) => {
          console.error("Error fetching chat ID:", error);
        });
    }
  }, [user, selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    socket.emit("message", {
      text: newMessage,
      sender: user._id,
      receiver: selectedUser._id,
      chatId: selectedChatId,
      socketId: socket.id,
    });

    // setMessages((prevMessages) => [...prevMessages]);
    setNewMessage("");
  };

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  }

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white rounded-xl w-full h-full overflow-y-auto">
      {selectedUser === null ? (
        <div className=" w-full h-full justify-center items-center flex-col">
          <img
            src={require("../../assets/img/chatbg.png")}
            alt=""
            className="w-1/2 h-1/2 object-contain mx-auto"
          />
          <div className="text-center text-gray-800">
            <h2 className="text-2xl font-bold">Pick up where you left off</h2>
            <div className="text-gray-600">
              Select a conversation and chat away.
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <div className="flex flex-col h-full">
              {/* head */}
              <div className="sticky top-0 left-0 w-full z-50 bg-white p-3 shadow-md ">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="w-3 h-3 rounded-full  bg-green-500"></span>
                      <a href="s" className="underline font-semibold">
                        {selectedUser.name}
                      </a>
                      <span className="font-semibold text-gray-500">
                        @{selectedUser.username}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">
                        Last seen: 3 days ago
                      </span>
                    </div>
                  </div>

                  <div>
                    <button className="hover:bg-gray-100 rounded-full p-1 text-sm text-gray-800 font-semibold">
                      <VideoCameraIcon className="w-6 h-6" />
                    </button>

                    <button className="hover:bg-gray-100 rounded-full p-1 text-sm text-gray-800 font-semibold">
                      <StarIcon className="w-6 h-6" />
                    </button>

                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group hover:bg-gray-100 rounded-full p-1 text-sm text-gray-800 font-semibold">
                          <div>
                            <EllipsisHorizontalIcon className="w-6 h-6" />
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
                              <button className="text-gray-800 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                                All Messages
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button className="text-gray-800 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                                Unread
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button className="text-gray-800 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                                Starred
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button className="text-gray-800 p-2 hover:bg-gray-100 flex gap-2 items-center w-full">
                                Spam
                              </button>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="bg-white text-gray-800 text-sm h-full w-full overflow-hidden">
                <div
                  className="flex flex-col justify-end p-3 h-full w-full overflow-auto"
                  ref={chatContainerRef}
                >
                  <div className="flex-1 h-full">
                    {messages.map((message, index) => {
                      if (message.chatType === "single") {
                        if (user._id === message.receiver) {
                          // Messages sent by another user
                          return (
                            <div
                              className="flex justify-start w-full mb-1"
                              key={index}
                            >
                              <div className="w-1/2 flex justify-start">
                                <div>
                                  <div className="flex gap-3">
                                    <img
                                      src={message.sender.avatar}
                                      alt=""
                                      className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col items-start">
                                      <span className="font-semibold">
                                        {message.sender.name}
                                      </span>
                                      <div className="bg-nft-primary-light w-fit text-white p-2 rounded-lg">
                                        {message.text}
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(message.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          // Messages received by you
                          return (
                            <div
                              className="flex justify-end w-full mb-3"
                              key={index}
                            >
                              <div className="w-1/2 flex justify-end">
                                <div className="flex gap-3">
                                  <div className="flex flex-col items-end">
                                    <span className="font-semibold">Me</span>
                                    <div className="bg-gray-100 w-fit text-gray-800 p-2 rounded-lg">
                                      {message.text}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(message.createdAt)}
                                    </span>
                                  </div>
                                  <img
                                    src={user.avatar}
                                    alt=""
                                    className="w-7 h-7 rounded-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
              </div>

              <form
                className="sticky bottom-0 left-0 w-full z-50 bg-white p-3 shadow-[0px_2px_10px_#e7e7e7]"
                onSubmit={sendMessage}
              >
                <div className="relative w-full">
                  <textarea
                    type="text"
                    className="text-sm rounded-xl block bg-gray-50 w-full p-3  outline-none border ring-purple-700 focus:ring-2 focus:bg-transparent hover:bg-gray-200 hover:bg-opacity-70 resize-none h-20"
                    placeholder="Send a message..."
                    value={newMessage}
                    onChange={typingHandler}
                  ></textarea>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      type="button"
                    >
                      <FaceSmileIcon className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      type="button"
                    >
                      <PaperClipIcon className="w-5 h-5 text-gray-800" />
                    </button>
                  </div>
                  <button
                    className="flex gap-2 bg-nft-primary-light text-white p-2 rounded-xl items-center text-sm hover:opacity-80"
                    type="submit"
                  >
                    <span>Send</span>
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatWindow;
