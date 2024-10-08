import connectDB from "@/config/database";
import Property from "@/models/Property";

//Get /api/properties/search
export const GET = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  try {
    await connectDB();
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    console.log(location, propertyType);

    const locationPattern = new RegExp(location, "i");

    const query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
