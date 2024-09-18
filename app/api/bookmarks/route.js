import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("Authorization failed", { status: 401 });
    }

    const { userId } = sessionUser;
    const user = await User.findById(userId);

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("Authorization failed", { status: 401 });
    }

    const { userId } = sessionUser;
    const { propertyId } = await request.json();

    console.log(userId);

    const user = await User.findById(userId);
    console.log(user);

    let isBookmarked = user.bookmarks.includes(propertyId);
    console.log(isBookmarked);
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
