# Run the budget tracker with Docker

This runs the root React/Vite budget tracker as a production build served by Nginx.
The Expo mobile app and the marketing site in `website/` use their existing workflows.

## Windows setup

Install [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
if needed, use its WSL 2 backend and Linux containers, and start Docker Desktop.
Docker Compose is included with Docker Desktop.

Check that the engine is ready:

```powershell
docker --version
docker compose version
docker info
```

## Start the app

In PowerShell:

```powershell
Set-Location 'D:\Web Projects\budgettracker'
docker compose up -d --build
```

Open http://localhost:3000. The first build downloads images and installs Node dependencies.
The container also appears in Docker Desktop under Containers.
If port 3000 is occupied, stop the existing dev server or change the host port in
`compose.yaml`, for example `127.0.0.1:3001:80`, then open http://localhost:3001.

## Everyday commands

```powershell
# Status and health
docker compose ps

# View logs (Ctrl+C exits the log view)
docker compose logs -f web

# Rebuild after source changes
docker compose up -d --build

# Stop and remove this project's containers
docker compose down
```

This serves a compiled build; source edits require a rebuild. Continue using
`npm run dev` for live development with hot reload.

The current web app stores budget records in browser localStorage, so no database
container or Docker volume is needed. Removing a container does not clear browser
data. Data is specific to the browser and origin: changing the port or hostname
opens a separate storage area. Docker does not add cloud sync or connect the mobile
app to this web app. Environment files and credentials are excluded from the image.

The root project currently has no npm lockfile, so its image uses `npm install`.
Dependency versions can vary on a fresh build; commit a root `package-lock.json`
and switch the Dockerfile to `npm ci` when adopting locked installs.
