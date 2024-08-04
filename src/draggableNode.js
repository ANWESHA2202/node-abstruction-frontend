// draggableNode.js

import { Paper } from "@mui/material";
import { TfiWrite } from "react-icons/tfi";
import { LuFileType2 } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const renderIcon = () => {
    switch (type.value) {
      case "customOutput":
      default:
        return <LuFileType2 />;
      case "input":
      case "text":
      case "textarea":
        return <TfiWrite />;
      case "img":
        return <FaImage />;
      case "video":
        return <FaVideo />;
    }
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <Paper
        elevation={1}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          justifyContent: "center",
          flexDirection: "column",
          width: 80,
          height: 60,
          cursor: "pointer",
          border: "2px solid rgb(230 230 230 / 45%)",
          color: "gray",
        }}
      >
        <div>{renderIcon()}</div>
        <span>{label}</span>
      </Paper>
    </div>
  );
};
