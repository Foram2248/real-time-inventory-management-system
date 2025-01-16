const { spawn } = require("child_process");
const svelte = require("rollup-plugin-svelte");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const livereload = require("rollup-plugin-livereload");
const css = require("rollup-plugin-css-only");
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const replace = require("@rollup/plugin-replace");
const dotenv = require("dotenv");
const production = !process.env.ROLLUP_WATCH;

dotenv.config();

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

module.exports = {
  input: "src/main.js",
  output: {
    sourcemap: true,
    name: "app",
    format: "esm",
    dir: "public/build",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
    }),
    postcss({
      extract: "tailwind.css",
      minimize: production,
      plugins: [require("tailwindcss"), require("autoprefixer")],
    }),
    css({ output: "bundle.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
      exportConditions: ["svelte"],
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      "process.env.WEBSOCKET_URL": JSON.stringify(
        process.env.WEBSOCKET_URL || "http://localhost:5000"
      ),
    }),
    !production && serve(),
    !production && livereload("public"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
