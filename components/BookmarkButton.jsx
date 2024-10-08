"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIsBookmarked = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res?.status === 200) {
          const result = await res.json();
          setIsBookmarked(result.isBookmarked);
        } else {
          toast("something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast("something went wrong");
      } finally {
        setLoading(false);
      }
    };

    checkIsBookmarked();
  }, [userId, property._id]);

  const handleClick = async () => {
    if (!userId) {
      toast("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res?.status === 200) {
        const result = await res.json();
        console.log(result);
        toast(result.message);
        setIsBookmarked(result.isBookmarked);
      } else {
        toast("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : userId ? (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    ""
  );
};

export default BookmarkButton;
