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

### Server Configuration

The application is configured to run on port 3000 and bind to all network interfaces (0.0.0.0) by default. This means it should be accessible from your specific IP address (13.204.47.235:3000).

You can customize the port and host by:

1. Editing the `ecosystem.config.js` file:

   ```js
   env_production: {
     NODE_ENV: "production",
     PORT: 3000,  // Change this to your desired port
     HOST: "0.0.0.0"  // Use a specific IP if needed
   }
   ```

2. Or by setting environment variables when starting the application:

   ```
   PORT=3000 HOST=0.0.0.0 npm start
   ```

3. Or by setting environment variables in PM2:
   ```
   pm2 set portfolio env.PORT 3000
   pm2 set portfolio env.HOST "0.0.0.0"
   pm2 restart portfolio
   ```

### Firewall Configuration

If you're having trouble accessing the application from your IP address, make sure:

1. The server's firewall allows incoming connections on port 3000:

   ```
   # For Ubuntu/Debian with UFW
   sudo ufw allow 3000/tcp

   # For CentOS/RHEL with firewalld
   sudo firewall-cmd --permanent --add-port=3000/tcp
   sudo firewall-cmd --reload
   ```

2. If you're using a cloud provider (AWS, Azure, GCP, etc.), check that the security group or network security rules allow incoming traffic on port 3000.

3. If you're behind a reverse proxy (Nginx, Apache), make sure it's correctly configured to forward requests to your application. An example Nginx configuration is provided in `nginx.conf.example`.

### Troubleshooting

If you're having trouble accessing the application, you can use the included troubleshooting script:

```
# Make the script executable
chmod +x troubleshoot.sh

# Run the script
./troubleshoot.sh
```

This script will check:

- Node.js version compatibility
- PM2 installation and application status
- Port usage
- Firewall configuration
- Local and public IP connectivity

You can also run the server check script to test connectivity:

```
npm run check-server
```

Common issues and solutions:

1. **Application not starting**: Check PM2 logs with `pm2 logs portfolio`
2. **Port already in use**: Find and stop the process using port 3000, or change the port in `ecosystem.config.js`
3. **Firewall blocking access**: Configure your firewall to allow traffic on port 3000
4. **Node.js version too old**: Use the upgrade script `./upgrade-node.sh`

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
