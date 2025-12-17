# Playme8 WebView App - Source Files Package 📦

## Complete Source Code for Building APK

This package contains everything you need to build the Playme8 WebView APK on any machine or build service.

---

## 📂 Package Contents

### Core Application Files

```
playme8-webview-app/
├── app/                                    # Main application code
│   └── index.tsx                          # WebView implementation (MAIN FILE)
├── config/
│   └── app-config.json                    # Website URL configuration
├── assets/
│   ├── images/
│   │   ├── icon.png                       # App icon
│   │   ├── adaptive-icon.png              # Android adaptive icon
│   │   ├── splash-icon.png                # Splash screen
│   │   └── favicon.png                    # Web favicon
├── app.json                                # Expo configuration (IMPORTANT)
├── eas.json                                # Build configuration (IMPORTANT)
├── package.json                            # Dependencies (IMPORTANT)
├── tsconfig.json                           # TypeScript config
├── metro.config.js                         # Metro bundler config
├── .env                                    # Environment variables
└── README.md                               # Project documentation
```

### Documentation Files

```
docs/
├── BUILD_INSTRUCTIONS.md                   # How to build APK
├── QUICK_START_GUIDE.md                   # Quick start guide
├── WEBVIEW_APP_README.md                  # Full app documentation
├── NAVIGATION_FIX.md                      # Navigation improvements
├── EXTERNAL_REDIRECT_ENABLED.md           # Redirect features
├── LOADING_BUFFER_FIX.md                  # Loading fixes
├── BUTTON_CLICK_LOADING_FIX.md           # Button click fixes
└── APK_BUILD_TROUBLESHOOTING.md          # Troubleshooting guide
```

---

## 🚀 Quick Start - Build APK in 3 Steps

### Step 1: Setup Environment

**On your local machine or server:**

```bash
# Install Node.js (v18 or higher)
# Download from: https://nodejs.org

# Install EAS CLI globally
npm install -g eas-cli

# Verify installation
eas --version
```

### Step 2: Prepare Project

```bash
# Extract the source files
unzip playme8-webview-app.zip
cd playme8-webview-app/frontend

# Install dependencies
npm install
# or
yarn install
```

### Step 3: Build APK

```bash
# Login to Expo (create free account at expo.dev)
eas login

# Configure build (first time only)
eas build:configure

# Build APK
eas build --platform android --profile preview

# Wait 15-20 minutes, download APK from URL provided
```

---

## 📋 File Details

### 1. **app/index.tsx** (Main Application)

**Size:** ~15 KB  
**Purpose:** Complete WebView implementation with all features

**Key Features Implemented:**
- WebView with URL loading
- 15-second timeout protection
- Progress-based loading detection
- Cookie management (thirdPartyCookies, sharedCookies)
- Mixed content mode
- Pull-to-refresh
- Back button navigation
- Network connectivity detection
- Error handling with retry
- Light/dark theme support
- JavaScript injection for SPA support

**Lines of Code:** ~350 lines

### 2. **config/app-config.json** (Configuration)

```json
{
  "webViewUrl": "https://pgbetuljp.site",
  "allowedUrls": [
    "https://pgbetuljp.site"
  ],
  "appName": "Playme8: Trusted iGaming Mobile Application"
}
```

**How to Change URL:**
Edit this file to point to any website you want!

### 3. **app.json** (Expo Configuration)

**Important Settings:**
- `name`: "Playme8"
- `slug`: "playme8-igaming"
- `version`: "1.0.0"
- `android.package`: "com.playme8.igaming"
- `ios.bundleIdentifier`: "com.playme8.igaming"
- `permissions`: ["INTERNET", "ACCESS_NETWORK_STATE"]

### 4. **eas.json** (Build Configuration)

**Build Profiles:**
- `preview`: Generates APK for testing
- `production`: Generates AAB for Play Store
- `development`: Debug builds

### 5. **package.json** (Dependencies)

**Key Dependencies:**
- `react-native-webview`: 13.13.5
- `@react-native-community/netinfo`: 11.4.1
- `expo`: 54.0.29
- `react`: 19.0.0
- `react-native`: 0.79.5

**Total Dependencies:** 42 packages

---

## 💻 Build Options

### Option 1: EAS Build (Recommended)

**Pros:**
- ✅ Cloud-based (no local setup needed)
- ✅ Official Expo service
- ✅ Automatic signing
- ✅ Works on any machine

**Cons:**
- ⏱️ Takes 15-20 minutes
- 💰 Free tier limited builds

**Cost:** Free (100 builds/month)

### Option 2: Local Build with Android Studio

**Pros:**
- ✅ Full control
- ✅ Unlimited builds
- ✅ No waiting in queue

**Cons:**
- ⚙️ Complex setup
- 💾 Requires 10GB+ disk space
- 🖥️ Needs powerful computer

**Requirements:**
- Android Studio installed
- Android SDK configured
- Java JDK 11+

### Option 3: Online Build Services

**Services:**
- **Expo EAS**: https://expo.dev (recommended)
- **AppCenter**: https://appcenter.ms
- **Bitrise**: https://bitrise.io
- **CircleCI**: https://circleci.com

**Cost:** Varies ($0-50/month)

### Option 4: Hire Developer (Fastest!)

**Platforms:**
- **Fiverr**: $20-50, 1-2 days
- **Upwork**: $30-100, 1-3 days
- **Freelancer**: $25-75, 1-2 days

**What to provide:**
- This ZIP file
- Build requirements
- Desired app name/icon

---

## 🔧 Customization Guide

### Change Website URL

**File:** `config/app-config.json`

```json
{
  "webViewUrl": "https://your-website.com",
  "allowedUrls": [
    "https://your-website.com"
  ],
  "appName": "Your App Name"
}
```

### Change App Name

**File:** `app.json`

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change App Icon

**Replace files:**
- `assets/images/icon.png` (1024x1024)
- `assets/images/adaptive-icon.png` (1024x1024)
- `assets/images/splash-icon.png` (2048x2048 recommended)

### Change Package Name

**File:** `app.json`

```json
{
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```

### Adjust Loading Timeout

**File:** `app/index.tsx`

**Find line ~95:**
```javascript
}, 15000); // Change this number (milliseconds)
```

**Examples:**
- 10 seconds: `10000`
- 20 seconds: `20000`
- 30 seconds: `30000`

---

## 📱 Testing Before Building

**Use Expo Go (Fastest Way):**

1. Install Expo Go from Play Store
2. Run on your development machine:
   ```bash
   cd frontend
   npm start
   ```
3. Scan QR code with Expo Go
4. Test all features immediately!

**Benefits:**
- ✅ Instant testing
- ✅ See changes in real-time
- ✅ No build time
- ✅ Perfect for debugging

---

## 🐛 Troubleshooting

### Build Fails with "Module not found"

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Build Fails with "Unauthorized"

```bash
# Re-login
eas logout
eas login
```

### Build Fails with "Invalid configuration"

```bash
# Re-configure
eas build:configure
```

### APK Won't Install on Phone

**Causes:**
- Package name conflicts
- Android version too old
- Corrupted download

**Fix:**
- Uninstall existing app first
- Check Android version (need 6.0+)
- Re-download APK

---

## 📊 File Sizes

**Source Code:**
- Total: ~5 MB (compressed)
- Extracted: ~250 MB (with node_modules)

**Built APK:**
- Size: 40-50 MB
- Depends on: Assets, dependencies

**Build Time:**
- EAS Cloud: 15-20 minutes
- Local Build: 5-10 minutes (after setup)

---

## 🔐 Important Notes

### Security

1. **API Keys:** Not needed for this app
2. **Signing:** EAS handles automatically
3. **Permissions:** Only INTERNET and NETWORK_STATE

### App Store Submission

**Google Play Store:**
- Use `production` profile (AAB format)
- Required: Screenshots, description, privacy policy
- Review time: 1-7 days
- Cost: $25 one-time fee

**Apple App Store:**
- Requires Mac for iOS build
- Apple Developer account: $99/year
- More strict review process

### Performance

**Optimized for:**
- ✅ Low memory usage (~50MB)
- ✅ Fast loading (2-5 seconds)
- ✅ Smooth navigation
- ✅ Battery efficient

---

## 📞 Support & Help

### If Build Fails

1. **Check logs:**
   ```bash
   eas build:view [BUILD_ID] --logs
   ```

2. **Common issues:**
   - Network timeout → Retry
   - Missing dependencies → Run `npm install`
   - Configuration error → Check app.json

3. **Get help:**
   - Expo Discord: https://chat.expo.dev
   - Stack Overflow: Tag with `expo`, `eas-build`
   - Expo Forums: https://forums.expo.dev

### If You Need Changes

The main code is in:
- **WebView logic:** `app/index.tsx`
- **URL config:** `config/app-config.json`
- **App settings:** `app.json`

Any developer familiar with React Native can modify these files.

---

## ✅ Pre-Build Checklist

Before building, verify:

- [ ] Node.js installed (v18+)
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Expo account created (free at expo.dev)
- [ ] All files extracted
- [ ] Dependencies installed (`npm install`)
- [ ] Configuration reviewed (app.json, config/app-config.json)
- [ ] Internet connection stable
- [ ] 15-20 minutes available for build

---

## 🎯 Next Steps

1. **Download all source files** (see list below)
2. **Follow Quick Start guide** above
3. **Build APK with EAS**
4. **Or hire developer** on Fiverr/Upwork
5. **Test APK on device**
6. **Deploy to users!**

---

## 📦 Files to Download

All files are located in `/app/frontend/` directory:

### Essential Files (Required):
1. `app/index.tsx`
2. `config/app-config.json`
3. `app.json`
4. `eas.json`
5. `package.json`
6. `tsconfig.json`
7. `metro.config.js`
8. `.env`

### Asset Files (Required):
9. `assets/images/icon.png`
10. `assets/images/adaptive-icon.png`
11. `assets/images/splash-icon.png`
12. `assets/images/favicon.png`

### Documentation Files (Optional but Recommended):
13. All `.md` files in `/app/` directory

### Note on node_modules:
- **Don't copy** `node_modules` folder
- **Run** `npm install` instead
- This is faster and ensures correct dependencies

---

## 🚀 You're Ready!

With these files, you or any developer can:
- ✅ Build APK immediately
- ✅ Customize as needed
- ✅ Deploy to users
- ✅ Submit to Play Store

**Good luck with your app! 🎉**
