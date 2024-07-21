import { FileImageOutlined, FileTextOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { downloadDoc, filesUrl } from "../../api";
import { ImageViewer } from "./AttachedFileButton.styled";

const allowedImageExt = ["png", "jpg", "jpeg", "gif"];
const allowedDocumentExt = ["txt"];

export const AttachedFileButton = ({ filename }) => {
  const [fileType, setFileType] = useState();
  const [viewOpen, setViewOpen] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (viewOpen) {
      setStyle({});
    } else {
      setStyle({ transform: "scale(0.1)" });
    }
  }, [viewOpen]);

  useEffect(() => {
    if (!filename) return;
    const ext = filename.split(".")[1];
    if (!ext) return;
    if (allowedImageExt.includes(ext)) {
      setFileType("image");
      return;
    }
    if (allowedDocumentExt.includes(ext)) {
      setFileType("doc");
      return;
    }
  }, [filename]);

  const handleClosModal = useCallback(() => {
    setTimeout(() => setViewOpen(false), 500);
    setStyle({ transform: "scale(0.1) rotate(270deg)" });
  }, []);

  const handleOpen = () => {
    if (fileType === "image") {
      setViewOpen(true);
      return;
    }
    if (fileType === "doc") {
      downloadDoc(filesUrl(filename));
    }
  };

  const buttonImage =
    fileType === "image" ? (
      <FileImageOutlined style={{ fontSize: 24 }} />
    ) : (
      <FileTextOutlined style={{ fontSize: 24 }} />
    );

  return (
    <>
      {fileType && (
        <button type="button" title="View file" onClick={handleOpen}>
          {buttonImage}
        </button>
      )}
      {viewOpen && (
        <Backdrop closeModal={handleClosModal}>
          <ImageViewer src={filesUrl(filename)} style={style} />
        </Backdrop>
      )}
    </>
  );
};
