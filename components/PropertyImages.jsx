import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrl";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  if (!images || !images.length) return "";

  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={getImageUrl(images[0])}
              thumbnail={getImageUrl(images[0])}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  src={getImageUrl(images[0])}
                  ref={ref}
                  onClick={open}
                  alt=""
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                ${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }
              `}
                >
                  <Item
                    original={getImageUrl(image)}
                    thumbnail={getImageUrl(image)}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={getImageUrl(image)}
                        alt=""
                        className="object-cover h-[400px] w-full rounded-xl"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
