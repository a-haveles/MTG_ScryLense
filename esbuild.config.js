const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["app/javascript/application.js"],
  bundle: true,
  sourcemap: true,
  format: "esm",
  outdir: "app/assets/builds",
  publicPath: "/assets",
  watch: process.argv.includes("--watch"),
  loader: {
    ".js": "jsx",
    ".jsx": "jsx"
  },
}).catch(() => process.exit(1));