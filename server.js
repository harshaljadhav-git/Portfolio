import { createServer } from "http";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createReadStream } from "fs";

// Check Node.js version compatibility
const nodeVersion = process.version;
const requiredVersion = "v18.0.0";

if (compareVersions(nodeVersion, requiredVersion) < 0) {
  console.error(
    `Error: This application requires Node.js ${requiredVersion} or higher.`
  );
  console.error(`Current Node.js version: ${nodeVersion}`);
  console.error("Please upgrade your Node.js installation.");
  process.exit(1);
}

function compareVersions(a, b) {
  const partsA = a.substring(1).split(".").map(Number);
  const partsB = b.substring(1).split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    if (partA !== partB) return partA - partB;
  }

  return 0;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = join(__dirname, "dist");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "font/eot",
  ".otf": "font/otf",
};

const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Get the path from the URL
  let path = req.url;

  // Remove query parameters if any
  if (path.includes("?")) {
    path = path.split("?")[0];
  }

  // Default to index.html for root path or if no file extension
  if (path === "/" || !path.includes(".")) {
    path = "/index.html";
  }

  const filePath = join(DIST_DIR, path);

  try {
    // Get file extension to determine content type
    const ext = path.substring(path.lastIndexOf("."));
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Set headers
    res.setHeader("Content-Type", contentType);

    // Stream the file
    const stream = createReadStream(filePath);
    stream.pipe(res);

    stream.on("error", (error) => {
      console.error(`Error streaming file: ${error.message}`);

      // If file not found, serve index.html (for SPA routing)
      if (error.code === "ENOENT" && path !== "/index.html") {
        res.setHeader("Content-Type", "text/html");
        createReadStream(join(DIST_DIR, "index.html")).pipe(res);
      } else {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);

    if (error.code === "ENOENT") {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
