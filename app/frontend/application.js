// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import "@hotwired/turbo-rails"
// import "controllers"
import React from "react";
import { createRoot } from "react-dom/client";
import DeckUploader from "./components/DeckUploader";
import "../assets/stylesheets/application.css"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("deck-uploader");
  if (container) {
    createRoot(container).render(<DeckUploader />);
  }
});

