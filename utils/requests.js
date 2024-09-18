const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

//Fetch all properties
const fetchProperties = async () => {
  try {
    // Handle case where api domain not available yet
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

//Fetch single property
const fetchProperty = async (id) => {
  try {
    // Handle case where api domain not available yet
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Error fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { fetchProperties, fetchProperty };
