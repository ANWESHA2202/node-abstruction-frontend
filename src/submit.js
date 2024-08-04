// submit.js

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [response, setResponse] = useState({});

  const handleSubmit = async () => {
    const nodesData = nodes?.map((node) => node.data);
    const edgesData = edges?.map((edge) => {
      let edgeData = {
        source: edge.source,
        target: edge.target,
      };
      return edgeData;
    });
    const payload = {
      nodesData,
      edgesData,
    };
    const formData = new FormData();
    formData.append("pipeline", JSON.stringify(payload));

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setResponse({
          type: 200,
          message:
            jsonResponse?.result?.is_dag === true
              ? `Woohoo!! your flow isn't forming any cycle`
              : `OOO Ou! ${jsonResponse?.result?.num_nodes}nodes are forming a cycle`,
        });
      } else {
        setResponse({
          type: 500,
          message: `Oops! encountered some error`,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setTimeout(() => {
        setResponse({});
      }, 5000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="contained" type="submit" onClick={() => handleSubmit()}>
        Submit
      </Button>

      <div style={{ position: "absolute", top: 0 }}>
        <Accordion
          expanded={Object.keys(response)?.length > 0}
          style={{ boxShadow: "none" }}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            {""}
          </AccordionSummary>
          <AccordionDetails>
            <Alert
              variant="outlined"
              severity={
                response?.type === 200
                  ? "success"
                  : response?.type === 500
                  ? "error"
                  : ""
              }
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setResponse({});
                  }}
                >
                  <IoCloseCircleOutline fontSize="inherit" />
                </IconButton>
              }
            >
              {response?.message}
            </Alert>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
