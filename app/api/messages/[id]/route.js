import connectDB from "@/config/database";

import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//Post Send Message /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    const id = params.id;
    console.log(sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "Authorization failed" }), {
        status: 401,
      });
    }

    const msg = await Message.findById(id);

    if (!msg) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    if (msg.recipient.toString() !== sessionUser.userId.toString()) {
      return new Response("Authorization failed", {
        status: 401,
      });
    }

    msg.read = !msg.read;
    await msg.save();

    return new Response(JSON.stringify(msg), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//Delete Message /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    const id = params.id;
    console.log(sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "Authorization failed" }), {
        status: 401,
      });
    }

    const msg = await Message.findById(id);

    if (!msg) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    if (msg.recipient.toString() !== sessionUser.userId.toString()) {
      return new Response("Authorization failed", {
        status: 401,
      });
    }

    await msg.deleteOne();

    return new Response("Message deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
