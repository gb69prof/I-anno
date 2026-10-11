import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AgamemnonApp from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode><AgamemnonApp /></StrictMode>,
);

