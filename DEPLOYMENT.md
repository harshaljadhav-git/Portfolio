# Deployment Guide

This document explains how to set up the GitHub Actions workflow for deploying this portfolio application to your production server.

## GitHub Secrets Setup

To use the deployment workflow, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:

| Secret Name          | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `SERVER_HOST`        | The hostname or IP address of your server                       |
| `SERVER_USERNAME`    | The SSH username for your server                                |
| `SSH_PRIVATE_KEY`    | Your SSH private key for authentication                         |
| `SERVER_PORT`        | The SSH port (usually 22)                                       |
| `SERVER_DEPLOY_PATH` | The path on the server where the application should be deployed |

## Server Requirements

Ensure your server has the following installed:

1. Node.js (version 18.0.0 or higher REQUIRED for Vite v7 compatibility)
2. npm (comes with Node.js)
3. PM2 (install globally with `npm install -g pm2`)

### Node.js Version

This project uses Vite v7, which requires Node.js v18.0.0 or higher. If you're encountering the error `TypeError: crypto.hash is not a function`, it means your Node.js version is too old.

To check your Node.js version:

```
node -v
```

To update Node.js, you can use the included upgrade script:

```
# Make the script executable
chmod +x upgrade-node.sh

# Run the script
./upgrade-node.sh
```

Or manually update:

For Ubuntu/Debian:

```
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

For CentOS/RHEL:

```
# Using NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node -v
npm -v
```

Using NVM (Node Version Manager):

```
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Source NVM (or restart your terminal)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

## Deployment Process

The GitHub Actions workflow will:

1. Check out your code
2. Install dependencies
3. Build the project
4. Transfer the built files to your server (excluding development files)
5. Install production dependencies on the server
6. Start or restart the application using PM2

## Manual Deployment

If you need to deploy manually:

1. Build the application locally:

   ```
   npm run build
   ```

2. Transfer the files to your server:

   ```
   scp -r dist/* user@your-server:/path/to/deployment
   ```

3. SSH into your server:

   ```
   ssh user@your-server
   ```

4. Navigate to your deployment directory:

   ```
   cd /path/to/deployment
   ```

5. Install dependencies:

   ```
   npm ci --production
   ```

6. Start or restart the application with PM2:

   ```
   # If starting for the first time:
   pm2 start npm --name "portfolio" -- start

   # If restarting:
   pm2 restart portfolio

   # Save PM2 configuration:
   pm2 save
   ```

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions logs for any errors
2. Verify that all secrets are correctly set
3. Ensure your server has the necessary permissions
4. Check the PM2 logs on your server:
   ```
   pm2 logs portfolio
   ```
