import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import { spawn } from "child_process";
import cssnano from "cssnano";
import { dest, series, src, task, watch } from "gulp";
import gulpif from "gulp-if";
import postcss from "gulp-postcss";
import purgecss from "gulp-purgecss";
import sourcemaps from "gulp-sourcemaps";
import atimport from "postcss-import";
import tailwindcss from "tailwindcss";

import ghPages from "gulp-gh-pages";

const rawStylesheet = "src/style.css";
const rawJavascript = "src/js.js";
const siteRoot = "docs";
const jsRoot = `${siteRoot}/assets/js/`;
const cssRoot = `${siteRoot}/assets/css/`;
const tailwindConfig = "tailwind.config.js";

const devBuild =
  (process.env.NODE_ENV || "development").trim().toLowerCase() ===
  "development";

// Fix for Windows compatibility
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

// Custom PurgeCSS Extractor
// https://github.com/FullHuman/purgecss
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

task("buildJekyll", () => {
  browserSync.notify("Building Jekyll site...");

  const args = ["exec", jekyll, "build"];

  if (devBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});


task("processStyles", done => {
  browserSync.notify("Compiling styles...");

  return src(rawStylesheet)
    .pipe(postcss([atimport(), tailwindcss(tailwindConfig)]))
    .pipe(gulpif(devBuild, sourcemaps.init()))
    .pipe(
      gulpif(
        !devBuild,
        new purgecss({
          content: ["docs/**/*.html"],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["html", "js"]
            }
          ],
          whitelistPatterns: [/slick*/],
        })
      )
    )
    .pipe(gulpif(!devBuild, postcss([autoprefixer(), cssnano()])))
    .pipe(gulpif(devBuild, sourcemaps.write("")))
    .pipe(dest(cssRoot))
});

task("processJavascript", () => {
  return src(rawJavascript)
  .pipe(dest(jsRoot))
});

task("startServer", () => {
  browserSync.init({
    files: [siteRoot + "/**"],
    open: "local",
    port: 4000,
    server: {
      baseDir: siteRoot,
      serveStaticOptions: {
        extensions: ["html"]
      }
    }
  });

  watch(
    [
      "**/*.css",
      "**/*.html",
      "**/*.js",
      "**/*.md",
      "**/*.markdown",
      "!docs/**/*",
      "!node_modules/**/*"
    ],
    { interval: 500 },
    buildSite
  );
});

task('deploy', () => src('./docs/**/*').pipe(ghPages()));

const buildSite = series("buildJekyll", "processJavascript", "processStyles");

exports.serve = series(buildSite, "startServer");
exports.default = series(buildSite);
