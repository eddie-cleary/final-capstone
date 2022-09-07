import React, { useState, useEffect } from "react";
import { Button, Box, Stack } from "@mui/material";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";

const ImageUpload = ({ imageUpload, setImageUpload }) => {
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    setFileInput(e.target.files[0]);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    const signatureResponse = await axios.get(baseUrl + "/get-signature");

    const data = new FormData();
    data.append("file", fileInput);
    data.append("api_key", process.env.CLOUDAPIKEY);
    data.append("signature", signatureResponse.data.signature);
    data.append("timestamp", signatureResponse.data.timestamp);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/auto/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          console.log(e.loaded / e.total);
        },
      }
    );
    console.log(cloudinaryResponse.data);

    setImageUpload(cloudinaryResponse.data.public_id);

    if (!fileInput) return;
    uploadImage(fileInput);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Stack sx={{ mt: 4 }} alignItems="center">
        <Box
          component="input"
          type="file"
          name="image"
          onChange={handleFileChange}
          value=""
          sx={{ ml: 11 }}
        />
        {preview && (
          <>
            <Box
              sx={{
                height: "150px",
                width: "150px",
                mt: 2,
              }}
              component="img"
              src={preview}
              alt=""
            />
            <Button onClick={handleSubmitFile} sx={{ mt: 2 }}>
              Upload
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default ImageUpload;
