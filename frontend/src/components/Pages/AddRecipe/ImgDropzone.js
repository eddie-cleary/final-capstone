import React, { useCallback, useState } from "react";
import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";

const ImgDropzone = ({ setImgId, setFileInput }) => {
  const [preview, setPreview] = useState("");

  const handleDeleteImg = () => {
    setImgId("");
    setFileInput("");
    setPreview("");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      setPreview(reader.result);
    };
    setFileInput(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Box
        component="div"
        {...getRootProps()}
        sx={{ mt: 4 }}
        alignItems="center"
      >
        <Box component="input" sx={{ ml: 11 }} {...getInputProps()} />
        {isDragActive ? (
          <Box component="p">Stuff</Box>
        ) : (
          <Box component="p">Stuff</Box>
        )}
      </Box>
      {preview && (
        <Stack>
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
        </Stack>
      )}
    </>
  );
};

export default ImgDropzone;
