import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// Get /api/properties
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property)
      return new Response("Property Not Found", {
        status: 404,
      });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

//Delete /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    console.log(sessionUser);

    //check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Authentication failed", { status: 401 });
    }

    const { userId } = sessionUser;

    console.log(userId);
    await connectDB();

    const property = await Property.findById(propertyId);

    console.log(property);

    if (!property) {
      return new Response("Property Not Found", {
        status: 404,
      });
    }

    if (property.owner.toString() !== userId.toString()) {
      return new Response("UnAuthorized", {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response(`Deleted Property ${propertyId}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

//PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const { id } = params;

    const amenities = formData.getAll("amenities");

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("Authorization failed", { status: 401 });
    }

    const { userId } = sessionUser;

    const existingProperty = await Property.findById(id);

    console.log(existingProperty);
    console.log(existingProperty.owner);
    console.log(userId);

    if (!existingProperty) {
      return new Response("Property does not exist", { status: 500 });
    }

    //Check for authorization
    if (existingProperty.owner.toString() !== userId.toString()) {
      return new Response("Authorization failed", { status: 401 });
    }

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

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update property", { status: 500 });
  }
};
