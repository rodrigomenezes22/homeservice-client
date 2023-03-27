import ServiceProvider from "./ServiceProvider";
import ImageUploadForm from "./PropertyImage";
import CategoryUploadForm from "./Category";
import React from "react";

function Testing() {
  return (
    <div>
      <ImageUploadForm />

      <CategoryUploadForm />
      <ServiceProvider />
    </div>
  );
}

export default Testing;
