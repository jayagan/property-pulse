import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      required: true,
      type: String,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
    },
    amenities: [
      {
        type: String,
      },
    ],

    rates: {
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      nightly: {
        type: Number,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },

    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    images: [
      {
        type: String,
      },
    ],

    is_featured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
