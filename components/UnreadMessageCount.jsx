"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/globalContext";
const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      if (!session) {
        return;
      }

      try {
        const res = await fetch(`/api/messages/unread-count`);
        if (res?.status === 200) {
          const result = await res.json();
          setUnreadCount(result.count);
        } else {
          toast("something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast("something went wrong");
      }
    };

    fetchUnreadMessagesCount();
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
