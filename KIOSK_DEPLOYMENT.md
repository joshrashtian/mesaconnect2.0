# MESA Connect Kiosk Deployment Guide

This guide explains how to deploy the MESA Connect kiosk app on a Raspberry Pi.

## Architecture Overview

The MESA Connect application supports two deployment modes:

1. **Web App**: Full Next.js application with all features
2. **Kiosk App**: Optimized version for Raspberry Pi kiosk displays

## Build Targets

### Web App (Default)

```bash
npm run build:web
# or
NEXT_PUBLIC_APP_TARGET=web npm run build
```

### Kiosk App (Raspberry Pi)

```bash
npm run build:kiosk
# or
NEXT_PUBLIC_APP_TARGET=kiosk npm run build
```

## Raspberry Pi Deployment

### Prerequisites

1. **Raspberry Pi** (3B+ or 4B recommended)
2. **Raspberry Pi OS** (latest version)
3. **Docker** installed on Raspberry Pi
4. **Docker Compose** installed

### Installation Steps

1. **Install Docker on Raspberry Pi:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

2. **Install Docker Compose:**

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

3. **Clone the repository:**

```bash
git clone <your-repo-url>
cd mesaconnect2.0
```

4. **Build and run the kiosk app:**

```bash
# Build the kiosk Docker image
docker-compose -f docker-compose.kiosk.yml build

# Run the kiosk app
docker-compose -f docker-compose.kiosk.yml up -d
```

### Configuration

#### Environment Variables

Create a `.env` file for kiosk-specific configuration:

```env
NEXT_PUBLIC_APP_TARGET=kiosk
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Kiosk-Specific Features

The kiosk app automatically:

- ✅ Activates kiosk mode on startup
- ✅ Hides exit buttons (no way to exit kiosk mode)
- ✅ Enables auto-refresh for continuous operation
- ✅ Blocks navigation to prevent users from leaving
- ✅ Shows external app buttons (Spotify, Zoom)

### Auto-Start on Boot

To make the kiosk app start automatically when the Raspberry Pi boots:

1. **Enable Docker service:**

```bash
sudo systemctl enable docker
```

2. **Create a systemd service:**

```bash
sudo nano /etc/systemd/system/mesaconnect-kiosk.service
```

Add the following content:

```ini
[Unit]
Description=MESA Connect Kiosk
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/pi/mesaconnect2.0
ExecStart=/usr/local/bin/docker-compose -f docker-compose.kiosk.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.kiosk.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

3. **Enable and start the service:**

```bash
sudo systemctl enable mesaconnect-kiosk.service
sudo systemctl start mesaconnect-kiosk.service
```

### Browser Configuration

For a true kiosk experience, configure the browser to start in kiosk mode:

1. **Install Chromium:**

```bash
sudo apt-get install chromium-browser
```

2. **Create a kiosk startup script:**

```bash
nano ~/start-kiosk.sh
```

Add the following content:

```bash
#!/bin/bash
chromium-browser --kiosk --disable-web-security --user-data-dir=/tmp/chrome-kiosk http://localhost:3000/kiosk
```

3. **Make it executable:**

```bash
chmod +x ~/start-kiosk.sh
```

4. **Add to autostart:**

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/kiosk.desktop
```

Add the following content:

```ini
[Desktop Entry]
Type=Application
Name=MESA Connect Kiosk
Exec=/home/pi/start-kiosk.sh
Terminal=false
```

### Monitoring and Logs

#### View logs:

```bash
docker-compose -f docker-compose.kiosk.yml logs -f
```

#### Check status:

```bash
docker-compose -f docker-compose.kiosk.yml ps
```

#### Restart the app:

```bash
docker-compose -f docker-compose.kiosk.yml restart
```

### Updates

To update the kiosk app:

1. **Pull latest changes:**

```bash
git pull origin main
```

2. **Rebuild and restart:**

```bash
docker-compose -f docker-compose.kiosk.yml down
docker-compose -f docker-compose.kiosk.yml build --no-cache
docker-compose -f docker-compose.kiosk.yml up -d
```

## Development vs Production

### Development

- Use `npm run dev` for local development
- Kiosk mode can be activated via URL parameters
- All features are available

### Production (Kiosk)

- Optimized build with kiosk-specific features
- Auto-activation of kiosk mode
- Restricted navigation and exit options
- Resource-optimized for Raspberry Pi

## Troubleshooting

### Common Issues

1. **App not starting:**

   - Check Docker logs: `docker-compose -f docker-compose.kiosk.yml logs`
   - Verify port 3000 is available
   - Check system resources

2. **Browser not displaying correctly:**

   - Ensure Chromium is installed
   - Check if the kiosk startup script is working
   - Verify the app is accessible at `http://localhost:3000/kiosk`

3. **Performance issues:**
   - Monitor CPU and memory usage
   - Consider reducing resource limits in docker-compose
   - Check for other processes consuming resources

### Performance Optimization

For better performance on Raspberry Pi:

1. **Reduce memory usage:**

   - Lower the memory limits in docker-compose.kiosk.yml
   - Disable unnecessary features

2. **Optimize browser:**

   - Use hardware acceleration if available
   - Disable unnecessary browser features

3. **System optimization:**
   - Disable unnecessary services
   - Use an SSD for better I/O performance
