import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Box, Stack } from "@mui/material";
import { Image, Close } from "@mui/icons-material";

const ImgDropzone = ({ setFileInput, setimgId }) => {
  const [preview, setPreview] = useState("");

  const handleDeletePreview = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPreview("");
    setimgId("");
    setFileInput("");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    const file = acceptedFiles[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // Do whatever you want with the file contents
      setPreview(reader.result);
    };
    setFileInput(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px",
        cursor: "pointer",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#bbbbbb",
        borderStyle: "dotted",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out",
      }}
      component="div"
      {...getRootProps()}
    >
      <Box component="input" {...getInputProps()} />
      <Stack alignItems="center">
        {preview ? (
          <Stack direction="row" alignItems="center">
            <Box
              sx={{ height: "200px", width: "200px", objectFit: "cover" }}
              component="img"
              src={preview}
            ></Box>
            <Close
              sx={{
                ml: 2,
                "&:hover": {
                  color: "black",
                },
              }}
              color="warning"
              onClick={handleDeletePreview}
            />
          </Stack>
        ) : isDragActive ? (
          <>
            <Image fontSize="large" />
            <Typography>Drop here...</Typography>
          </>
        ) : (
          <>
            <Image fontSize="large" />
            <Typography>Recipe Image</Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ImgDropzone;
