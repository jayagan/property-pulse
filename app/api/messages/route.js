import connectDB from "@/config/database";

import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//Get /api/messages
export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "unAuthorized" }), {
        status: 401,
      });
    }
    const readMessages = await Message.find({
      recipient: sessionUser.userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unReadMessages = await Message.find({
      recipient: sessionUser.userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    return new Response(JSON.stringify([...unReadMessages, ...readMessages]), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error fetching messages", { status: 500 });
  }
};

//Post Send Message /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, owner, recipient, property } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    if (user.id.toString() === recipient) {
      return new Response(
        JSON.stringify({ message: "Cannot send a message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      name,
      email,
      phone,
      body: message,
      property,
      recipient,
    });
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
