#!/bin/bash

# Script to upgrade Node.js to a compatible version

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
elif type lsb_release >/dev/null 2>&1; then
    OS=$(lsb_release -si)
else
    OS=$(uname -s)
fi

echo "Detected OS: $OS"

# Function to upgrade Node.js on Debian/Ubuntu
upgrade_debian() {
    echo "Upgrading Node.js on Debian/Ubuntu..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
}

# Function to upgrade Node.js on RHEL/CentOS
upgrade_rhel() {
    echo "Upgrading Node.js on RHEL/CentOS..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo yum install -y nodejs
}

# Function to upgrade Node.js using NVM
upgrade_nvm() {
    echo "Upgrading Node.js using NVM..."
    
    # Check if NVM is installed
    if [ -z "$(command -v nvm)" ]; then
        echo "NVM not found. Installing NVM..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
        
        # Source NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    
    # Install and use Node.js 20
    nvm install 20
    nvm use 20
    nvm alias default 20
}

# Upgrade based on OS
case "$OS" in
    *Ubuntu*|*Debian*)
        upgrade_debian
        ;;
    *RHEL*|*CentOS*|*Fedora*)
        upgrade_rhel
        ;;
    *)
        echo "Unsupported OS for automatic upgrade. Trying NVM method..."
        upgrade_nvm
        ;;
esac

# Verify installation
echo "Node.js upgrade completed. Verifying installation..."
node -v
npm -v

echo "If you're still seeing an older version, you may need to restart your terminal or run 'source ~/.bashrc'"
echo "You can also try the NVM method by running: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash'"