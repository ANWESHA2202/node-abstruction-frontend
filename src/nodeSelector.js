import {
  Autocomplete,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const nodeOptions = [
  { label: "Text", value: "text" },
  { label: "Output", value: "customOutput" },
  { label: "Textarea", value: "textarea" },
  { label: "Image", value: "img" },
  { label: "Video", value: "video" },
  { label: "Date-Selector", value: "date-time" },
];

const selector = (state) => ({
  availableNodeTypes: state.availableNodeTypes,
  addNodeType: state.addNodeType,
});

const NodeSelector = ({ open, handleClose }) => {
  const [nodeType, setNodeType] = useState({});
  const [sourceHandleCount, setSourceHandleCount] = useState(1);
  const [targetHandleCount, setTargetHandleCount] = useState(1);
  const [creationError, setCreationError] = useState("");
  const { availableNodeTypes, addNodeType } = useStore(selector, shallow);

  const handleCreateNode = () => {
    const newNodeType = {
      ...nodeType,
      sourceHandleCount,
      targetHandleCount,
    };
    const isExisting = availableNodeTypes?.findIndex(
      (type) => type.value === nodeType.value
    );
    if (isExisting === -1) {
      addNodeType(newNodeType);
      handleClose();
    } else {
      setCreationError("Node type already exists");
      setTimeout(() => {
        setCreationError("");
        setNodeType({});
      }, 3000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="node-selector-modal"
    >
      <Paper
        className="modalContainer"
        elevation={3}
        sx={{ p: 4, outline: "none" }}
      >
        <Typography variant="h3">Customize your node</Typography>
        <Box mt={2}>
          <InputLabel id="node-type-select-label">Select node type:</InputLabel>
          <Autocomplete
            openOnFocus
            fullWidth
            id="node-type-combo-box"
            options={nodeOptions}
            value={nodeType}
            getOptionLabel={(option) => option?.label || ""}
            sx={{ width: 300, mt: 1 }}
            onChange={(e, value) => {
              if (value?.value) setNodeType(value);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Node type"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    style: { width: "100%" },
                  }}
                />
              );
            }}
          />
        </Box>
        <div style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
          <Box>
            <InputLabel id="node-connectors">Source connectors:</InputLabel>
            <TextField
              type="number"
              label="connectors"
              variant="outlined"
              value={sourceHandleCount}
              onChange={(e) => setSourceHandleCount(e.target.value)}
              inputProps={{
                min: 1,
                max: 5,
                style: { width: "90%" },
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <InputLabel id="node-connectors">Target connectors:</InputLabel>
            <TextField
              type="number"
              label="connectors"
              variant="outlined"
              value={targetHandleCount}
              onChange={(e) => setTargetHandleCount(e.target.value)}
              inputProps={{
                min: 1,
                max: 5,
                style: { width: "90%" },
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </div>
        <Button
          // disabled={
          //   !Object.keys(nodeType).length || handleCount < 1 || handleCount > 5
          // }
          variant="contained"
          color={creationError?.length ? "error" : "primary"}
          onClick={() => handleCreateNode()}
        >
          Create
        </Button>
        <span style={{ color: "red" }}>{creationError}</span>
      </Paper>
    </Modal>
  );
};

NodeSelector.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default NodeSelector;
