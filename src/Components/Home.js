import React from "react";
import ImageUploadForm from "./PropertyImage";
import CategoryUploadForm from "./Category";
import ButtonRight from "./ui/ButtonRight";

function Home() {
  return (
    <div>
      Home Page
      <ImageUploadForm />
      <CategoryUploadForm />
      <h1 className="pacifico">Home Page</h1>
      <ButtonRight
        name="Test button"
        styles="btn btn-primary rounded-pill"
        icon="arrow_forward_ios"
      />
    </div>
  );
}

export default Home;
