"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/globalContext";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleIsRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res?.status === 200) {
        const { read } = await res.json();
        toast.success(read ? "Marked as Read" : "Marked as New");
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
      } else if (res.status === 401 || res.status === 404) {
        toast.error(res.statusText);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res?.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted");
      } else if (res.status === 401 || res.status === 404) {
        toast.error(res.statusText);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
            New
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry:</span>{" "}
          {message.property?.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {" "}
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {" "}
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received:</strong>{" "}
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <button
          onClick={handleIsRead}
          className={`mt-4 mr-3 ${
            isRead ? "bg-gray-300 " : "bg-blue-800 text-white"
          }  py-1 px-3 rounded-md`}
        >
          {isRead ? "Mark As New" : "Mark as Read"}
        </button>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
