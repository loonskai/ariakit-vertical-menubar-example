import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Example from "./menubar-navigation/index.tsx";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Example />
    </StrictMode>
  );
}
