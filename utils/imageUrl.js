export const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("https")) {
    return image;
  }
  return `/images/properties/${image}`;
};
