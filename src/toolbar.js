// toolbar.js

import { DraggableNode } from "./draggableNode";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { IoAdd } from "react-icons/io5";
import NodeSelector from "./nodeSelector";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  availableNodeTypes: state.availableNodeTypes,
  addNodeType: state.addNodeType,
});

export const PipelineToolbar = () => {
  const [nodeSelectorOpen, setNodeSelectorOpen] = useState(false);
  const { availableNodeTypes, addNodeType } = useStore(selector, shallow);

  const renderToolbarOptions = useCallback(() => {
    return (
      <>
        {availableNodeTypes?.map((nodeType, idx) => {
          return (
            <DraggableNode key={idx} type={nodeType} label={nodeType.label} />
          );
        })}
      </>
    );
  }, [availableNodeTypes]);

  //handler functions
  const handleNodeSelector = () => {
    setNodeSelectorOpen((prev) => !prev);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {renderToolbarOptions()}
        <Button
          style={{ width: 60, height: 60 }}
          variant="outlined"
          onClick={() => handleNodeSelector()}
        >
          <IoAdd />
        </Button>
      </div>
      <NodeSelector handleClose={handleNodeSelector} open={nodeSelectorOpen} />
    </div>
  );
};
