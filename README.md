# Step Counter 👣

A modern, mobile-friendly step counter app built with React, Vite, and Ionic/Capacitor. Track your steps, view session stats, and get real-time feedback on your walking activity.

## Features ✨
- Step counting with live updates
- Session stats: steps, elapsed time, pace, and estimated distance
- Start, stop, and reset tracking
- Permission handling for device sensors
- Responsive design for mobile and desktop
- Instructions and error messages for user guidance

## Tech Stack 🛠️
- React + TypeScript
- Vite
- Ionic/Capacitor (for native device integration)
- Tailwind CSS (for styling)

## Getting Started 🚀

### Prerequisites 📦
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation 🧑‍💻
```bash
git clone <repo-url>
cd step-counter
npm install
```

### Running the App (Web) 🌐
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running on Android 📱
1. Build the web assets:
   ```bash
   npm run build
   ```
2. Sync with Capacitor:
   ```bash
   npx cap sync android
   ```
3. Open Android Studio:
   ```bash
   npx cap open android
   ```
4. Run on an emulator or device.

### Running on IOS 🍎
1. Build the web assets:
   ```bash
   npm run build
   ```
2. Sync with Capacitor:
   ```bash
   npx cap sync ios
   ```
3. Open Xcode:
   ```bash
   npx cap open ios
   ```
4. Run on a simulator or IPhone.


## Project Structure 🧬
- `src/components/StepCounter.tsx` — Main step counter UI
- `src/components/StepCounter/` — Subcomponents for stats, controls, instructions, etc.
- `src/hooks/useStepCounter.ts` — Custom hook for step tracking logic
- `src/utils/formatTime.ts` — Utility for formatting time
- `android/` — Native Android project (Capacitor)

## Customization 🎨
- Update styles in `tailwind.config.js` and `App.css`
- Modify step calculation logic in `useStepCounter.ts`

## License 🪪
BSD 3 Clause License
