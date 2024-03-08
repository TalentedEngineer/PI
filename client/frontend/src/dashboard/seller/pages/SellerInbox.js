import React from "react";
import ChatWindow from "../components/chat/ChatWindow";
import ChatUsersList from "../components/chat/ChatUsersList";
import ChatUserInfo from "../components/chat/ChatUserInfo";

const SellerInbox = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center gap-1.5 h-full">
        <div className="w-3/12 h-full">
          <ChatUsersList />
        </div>

        <div className="w-6/12 h-full relative">
          <ChatWindow />
        </div>

        <div className="w-3/12 h-full">
          <ChatUserInfo />
        </div>
      </div>
    </div>
  );
};

export default SellerInbox;
