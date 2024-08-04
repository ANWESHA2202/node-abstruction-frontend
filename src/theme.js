// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#361f7a",
    },
    // You can customize other parts of the palette here
  },
  // You can also customize typography, spacing, etc.
  typography: {
    fontSize: "0.9em",
    h2: {
      color: "#361f7a",
    },
    h3: {
      color: "#361f7a",
    },
    h4: {
      color: "#361f7a",
    },
    // You can continue with h5, h6, etc., if needed
  },
});

export default theme;
