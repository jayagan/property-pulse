"use client";
import React, { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import Message from "@/components/Message";
import { useGlobalContext } from "@/context/globalContext";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { unreadCount } = useGlobalContext();

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const res = await fetch(`/api/messages`);
        if (res?.status === 200) {
          const data = await res.json();
          console.log(data);
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserMessages();
  }, [session]);

  if (loading) return <Spinner loading={loading} />;
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {messages.length === 0 || unreadCount === 0 ? (
            <p> You have no messages </p>
          ) : (
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
