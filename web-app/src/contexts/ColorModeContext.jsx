import React from "react";

export const ColorModeContext = React.createContext({
  mode: "light",
  toggle: () => {},
});

export const getInitialMode = () => {
  const saved = localStorage.getItem("color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
