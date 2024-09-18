import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrl";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={getImageUrl(image)}
            alt=""
            className="object-cover h-[400px] w-full"
            priority={true}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
