import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { LuFileType2 } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { FaImage, FaVideo } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
  deleteNode: state.deleteNode,
});

export const CustomNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "input");
  const { updateNodeField, deleteNode } = useStore(selector, shallow);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handleDeleteNode = () => {
    deleteNode(data);
  };

  const findVariables = () => {
    let text = currText;
    let variableNames = [];
    const regex = /{{(.*?)}}/g;
    let matches = text.match(regex);

    if (matches) {
      variableNames = matches.map((match) =>
        match.replace(/{{|}}/g, "").trim()
      );
    }

    updateNodeField(id, "variableHandles", variableNames);
  };

  const renderIcon = () => {
    switch (data.value) {
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

  const renderNodeBody = () => {
    switch (data.value) {
      case "textarea":
      case "text":
      case "date-time": {
        return (
          <TextField
            multiline={data.value === "date-time" ? false : true}
            type={data.value === "date-time" ? "datetime-local" : "text"}
            label={data.label}
            minRows={2}
            value={currText}
            onBlur={() => findVariables()}
            onChange={handleTextChange}
            InputProps={{
              style: { borderRadius: "30px" },
            }}
          />
        );
      }
      case "img": {
        return (
          <img
            src="https://imgs.search.brave.com/6Uld7fdSva4N1RxNUb9WrvpE3gFdndcwnqt2cVf7TeI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzcwLzgzLzM2/LzM2MF9GXzY3MDgz/MzYxOV80NENwRGtD/V2dMQnZ0NDVlQlVj/bGhPQ2xrVnJCVUU2/Ny5qcGc"
            height={100}
            width={100}
            alt="img node"
          />
        );
      }
      case "video": {
        return (
          <iframe
            width="300"
            height="200"
            src="https://www.youtube.com/embed/WWS0uj-ed8U?si=xpU0zQ1Vl_-zr8PC"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        );
      }

      default: {
        return <div>{data?.text || "Node value"}</div>;
      }
    }
  };

  return (
    <div id={id} className="customNode">
      <div className="nodeHeaderContainer">
        <div className="nodeHeaderTitle">
          <span>{renderIcon()}</span>
          <span>{data?.label}</span>
        </div>

        <GiCancel onClick={() => handleDeleteNode()} />
      </div>
      <hr style={{ marginBottom: "1rem", marginTop: "-10px" }} />
      <div className="nodeBody">{renderNodeBody()}</div>

      {Array.from({ length: data.sourceHandleCount })?.map(
        (sourceHandle, index) => {
          return (
            <Handle
              className="handle"
              key={`${id}-${data.value}-${index}-source`}
              type="source"
              position={Position.Right}
              id={`${id}-${data.value}-${index}-source`}
              style={{
                top: `${(80 / data.sourceHandleCount) * (index + 1)}%`,
                background: "white",
                border: "1px solid rgba(0, 0, 0, 0.445)",
              }}
            />
          );
        }
      )}

      {Array.from({
        length:
          data.targetHandleCount +
          (data?.variableHandles?.length ? data?.variableHandles?.length : 0),
      })?.map((targetHandle, index) => {
        return (
          <>
            <Handle
              className="handle"
              key={`${id}-${data.value}-${index}-target`}
              type="target"
              position={Position.Left}
              id={`${id}-${data.value}-${index}-target`}
              style={{
                top: `${
                  (80 /
                    (data.targetHandleCount +
                      (data?.variableHandles?.length
                        ? data?.variableHandles?.length
                        : 0) +
                      1)) *
                  (index + 1)
                }%`,
                background: "white",
                border: "1px solid rgba(0, 0, 0, 0.445)",
                margin: "2px 0",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: `calc(${
                  (100 / (data?.variableHandles?.length + 1)) * (index + 1)
                }% - 8px)`,
                fontSize: "0.7em",
                width: "100px",
                left: "-110px",
                whiteSpace: "nowrap",
                textAlign: "right",
                color: "gray",
              }}
            >
              {data?.variableHandles?.[index] || ""}
            </span>
          </>
        );
      })}
    </div>
  );
};

export default CustomNode;
