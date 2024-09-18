"use client";
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [geocodeError, setGeocodeError] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: "100%",
    Zoom: 12,
    height: "500px",
  });

  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      console.log(property);
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //check results
        if (res.results.length === 0) {
          setGeocodeError(true);
        } else {
          const { lat, lng } = res.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng,
          });
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading &&
    !geocodeError && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <Image src={pin} alt="" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
