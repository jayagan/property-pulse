import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

//Get /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 9;
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);
    const result = { total, properties };
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

//Post Add Property
export const POST = async (request) => {
  try {
    await connectDB();
    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image.name);

    const sessionUser = await getSessionUser();
    console.log(sessionUser);

    if (!sessionUser || !sessionUser.user) {
      return new Response("Authorization failed", { status: 401 });
    }

    const { userId } = sessionUser;

    const propertyData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    console.log(propertyData);

    //upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert image data to base 64

      const imageBase64 = imageData.toString("base64");

      //Upload to cloudinary

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "propertypulse" }
      );

      imageUploadPromises.push(result.secure_url);
    }

    //wait for all images to upload

    const uploadedImages = await Promise.all(imageUploadPromises);
    //Add uploaded images to property data object

    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};
