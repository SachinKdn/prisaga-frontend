'use client'
import React, { useRef, useState } from "react";
import { Box, Theme } from "@mui/material";
import defaultImage from "@assets/png/profile-pic.png";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import createStyles from "@mui/styles/createStyles";
import Image, { StaticImageData } from "next/image";
import theme from "@app/theme";
const styles = {
    imageBoxContainer: {
      width: "150px",
      height: "auto",
      borderRadius: "50%",
      position: "relative",
      "& .image": {
        borderRadius: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "110px",
      },
    },
    imageBox: {
      height: "40px",
      width: "40px",
      position: "absolute",
      bottom: "0",
      right: "12px",
      borderRadius: "50%",
      background: '#fff',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "& .fileInputBox": {
        display: "none",
      },
    },
  }
interface UserContainerProps {
  callback?: ((fileUrl: File) => void) | undefined;
  readOnly?: boolean;
  defaultSrc?: string;
}
const UploadImage: React.FC<UserContainerProps> = ({
  callback = () => { },
  readOnly = false,
  defaultSrc = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(defaultSrc || defaultImage);
  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      callback(file);
    }
  };
  return (
    <Box sx={styles.imageBoxContainer}>
      <Image
        className="image"
        // height={"100%"}
        // width={"100%"}
        src={imageUrl}
        alt="Upload"
        style={{height: "100%", width: "100%"}}
      />
      {!readOnly && (
        <Box sx={styles.imageBox} onClick={handlePencilClick}>
          <input
            className="fileInputBox"
            ref={fileInputRef}
            type="file"
            id="image-input"
            name="photos"
            accept="jpeg, png"
            onChange={handleFileChange}
          />
          <CameraAltIcon
            sx={{
              width: "35px",
              height: "35px",
              [theme.breakpoints.down("sm")]: {
                width: "30px",
                height: "30px",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
export default UploadImage;
