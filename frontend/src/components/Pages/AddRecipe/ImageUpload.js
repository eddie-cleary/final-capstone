import React, { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageUpload = ({ setimgId, setFileInput }) => {
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

  const handleDeleteImg = () => {
    setimgId("");
    setFileInput("");
    setPreview("");
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
            <Stack alignItems="center">
              <Box
                sx={{
                  height: "150px",
                  width: "150px",
                  objectFit: "cover",
                  mt: 2,
                }}
                component="img"
                src={preview}
                alt=""
              />
              {preview && (
                <CloseIcon
                  onClick={handleDeleteImg}
                  sx={{ mt: 1, "&:hover": { cursor: "pointer" } }}
                  color="warning"
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default ImageUpload;
