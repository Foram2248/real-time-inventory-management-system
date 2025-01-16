import App from "./App.svelte";
import "./styles/global.css";
import "flowbite";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
