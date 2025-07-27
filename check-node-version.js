#!/usr/bin/env node

// Simple script to check Node.js version compatibility
const requiredVersion = "18.0.0";

function parseVersion(version) {
  // Remove 'v' prefix if present
  const cleanVersion = version.startsWith("v") ? version.substring(1) : version;
  return cleanVersion.split(".").map(Number);
}

function compareVersions(a, b) {
  const partsA = parseVersion(a);
  const partsB = parseVersion(b);

  for (let i = 0; i < 3; i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    if (partA !== partB) return partA - partB;
  }

  return 0;
}

const currentVersion = process.version;
const comparison = compareVersions(currentVersion, requiredVersion);

if (comparison < 0) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "╔════════════════════════════════════════════════════════════╗"
  );
  console.error(
    "\x1b[31m%s\x1b[0m",
    "║                      VERSION ERROR                         ║"
  );
  console.error(
    "\x1b[31m%s\x1b[0m",
    "╠════════════════════════════════════════════════════════════╣"
  );
  console.error(
    "\x1b[31m%s\x1b[0m",
    `║ Node.js version ${requiredVersion} or higher is required.`
  );
  console.error("\x1b[31m%s\x1b[0m", `║ Current version: ${currentVersion}`);
  console.error("\x1b[31m%s\x1b[0m", "║");
  console.error(
    "\x1b[31m%s\x1b[0m",
    "║ Please upgrade your Node.js installation:"
  );
  console.error("\x1b[31m%s\x1b[0m", "║");
  console.error("\x1b[31m%s\x1b[0m", "║ Ubuntu/Debian:");
  console.error(
    "\x1b[31m%s\x1b[0m",
    "║ curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
  );
  console.error("\x1b[31m%s\x1b[0m", "║ sudo apt-get install -y nodejs");
  console.error("\x1b[31m%s\x1b[0m", "║");
  console.error("\x1b[31m%s\x1b[0m", "║ CentOS/RHEL:");
  console.error(
    "\x1b[31m%s\x1b[0m",
    "║ curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -"
  );
  console.error("\x1b[31m%s\x1b[0m", "║ sudo yum install -y nodejs");
  console.error(
    "\x1b[31m%s\x1b[0m",
    "╚════════════════════════════════════════════════════════════╝"
  );
  process.exit(1);
} else {
  console.log(
    `Node.js version check passed: ${currentVersion} >= ${requiredVersion}`
  );
}
