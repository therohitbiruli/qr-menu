# Dinex Vite App (converted)

This folder is a Vite-compatible React app created from your original project.
I migrated files, added a modern dark/futuristic Login page, and updated package.json scripts.

## What I changed
- Added `vite.config.js`
- Replaced CRA scripts with Vite scripts in `package.json`
- Added `src/main.jsx`, `src/App.jsx`, `src/pages/Home.jsx`
- Added `src/components/Login.jsx` + `Login.css` (dark futuristic design)
- Added `react-router-dom` to dependencies (you must install)
- Created a Vite `index.html`

## Dev steps (run locally)
1. In project folder:
   ```bash
   cd dinex_vite
   npm install
   npm run dev
   ```
2. Build:
   ```bash
   npm run build
   ```

## Capacitor (Android) steps
Make sure you have Node, npm, Java, and Android Studio installed.

1. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli --save
   npx cap init
   ```
2. Build the Vite app:
   ```bash
   npm run build
   ```
3. Add Android platform and copy files:
   ```bash
   npx cap add android
   npx cap copy
   npx cap open android
   ```
4. In Android Studio: build -> Generate Signed Bundle / APK -> Upload to Play Store.

If you want, I can also:
- Integrate Capacitor configuration
- Create a simple native splash screen
- Add permissions for internet/storage
- Help generate AAB with steps in Android Studio