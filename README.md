# 🔌 BSES AMPS Mobile App (React Native)

---

## 🚀 Features

- ✅ Secure Login with JWT Token
- 📋 View Pending Order Details
- 🔍 Expandable Cards for structured data (e.g., Basic, CF, TF, Infrastructure, etc.)
- 📦 Dynamic API Integration for:
  - Pending Case Details
  - Approve / Reject Actions
  - TF Revisit Functionality
  - Deficiency List for Rejection
  - TF Engineer Dropdown
  - History Logs
- 📷 TF Image Gallery View (Fetched from Node.js server)
- 🌓 Theme Toggle Support (Light/Dark/System)
- ⚠️ Network Status Handling (Offline Guard)
- 🔐 Session Expiry Detection
- 💬 Comment modals for Approve/Reject/TF Revisit

---

## 🛠️ Tech Stack

| Technology     | Purpose                      |
|----------------|------------------------------|
| React Native   | Core mobile development      |
| Node.js        | Backend image server         |
| Express.js     | Backend API for TF images    |
| AsyncStorage   | Local token persistence      |
| JWT            | Session management           |
| React Navigation | Screen & drawer navigation |
| Modal / Picker | Input handling & UX          |

---

## 📁 Project Structure

```
📦 root/
├── android/
├── ios/
├── assets/
│   └── splashscreen_bg.jpeg
│   └── BijliSevaKendra_withoutBG.png
├── components/
│   └── CollapsibleCards.js
│   └── NetworkGuard.js
├── screens/
│   └── SplashScreen.js
│   └── LoginScreen.js
│   └── HomeScreen.js
│   └── DetailScreen.js
│   └── ThemeContext.js
├── Navigation/
│   └── DrawerNavigator.js
├── Services/
│   └── api.js
├── utils/
│   └── jwt.js
├── server/
│   └── server.kjs (Node backend for image delivery)
└── App.js
```

---

## ⚙️ Setup Instructions

### 1. 📦 Install Dependencies

```bash
npm install
```

### 2. ▶️ Start the React Native App

```bash
npx react-native run-android
```

> For iOS (Mac required):
```bash
npx pod-install
npx react-native run-ios
```

---

## 🌐 Backend (Optional)

For serving TF images via a local Node.js server:

### 🔧 `server.kjs`

```bash
cd server
node server.kjs
```

Make sure to place your image files in the `/public/uploads/` folder and access them via:

```
http://10.0.2.2:3001/api/tf-images
```

---

## 🔐 Token Expiry Logic

- Token is stored using `AsyncStorage`.
- Every time app comes to foreground, expiry is validated.
- If expired, user is logged out automatically and redirected to Login.

---

## 📱 Screenshots

| ![](./screenshots/splash.png) | ![](./screenshots/login.png) | ![](./screenshots/details.png) |
<img width="190" height="720" alt="image" src="https://github.com/user-attachments/assets/02c0d02d-de80-4ab2-b5c4-e5b814c345ce" />
<img width="190" height="720" alt="image" src="https://github.com/user-attachments/assets/6f25518c-8f11-4c09-ba1c-0261ff17f3b1" />
<img width="190" height="720" alt="image" src="https://github.com/user-attachments/assets/76f1105f-a064-4377-a03a-d5044e2fc1f2" />
<img width="190" height="720" alt="image" src="https://github.com/user-attachments/assets/d7a4a8b9-8e9b-4e22-8470-600be4ff8238" />

## 🧠 Learnings

- Integrating with real-world APIs
- Managing dark/light themes in mobile apps
- Handling complex JSON responses
- Clean architecture using `components/`, `services/`, `utils/`, and `screens/`
- Modal handling and state management

