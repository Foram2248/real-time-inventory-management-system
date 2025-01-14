import App from "./App.svelte";
import "./styles/global.css"; // Adjust the path if necessary
import "flowbite";
console.log("Main entry point is loading...");

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
