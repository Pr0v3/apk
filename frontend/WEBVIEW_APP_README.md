# Playme8: Trusted iGaming Mobile Application

## 📱 Overview
A professional React Native WebView application built with Expo that loads and displays the Playme8 iGaming platform. The app provides a native mobile experience with enhanced security, performance, and user-friendly features.

## ✨ Features Implemented

### Core WebView Features
- ✅ **URL Configuration**: Website URL stored in `/config/app-config.json` for easy updates
- ✅ **JavaScript Support**: Full JavaScript enabled for interactive web content
- ✅ **Back Button Navigation**: Hardware back button navigates through WebView history
- ✅ **Loading Progress**: Visual progress bar and loading indicator
- ✅ **Pull-to-Refresh**: Swipe down to reload the page
- ✅ **Network Connectivity Check**: Automatic detection and user-friendly error messages
- ✅ **Error Handling**: Comprehensive error handling with retry functionality

### Security Features
- ✅ **URL Whitelisting**: Restricted to only `https://tyring.org/pm8jkt`
- ✅ **Unauthorized URL Blocking**: Prevents navigation to non-whitelisted URLs
- ✅ **Secure WebView Settings**: DOM storage enabled, hardware acceleration
- ✅ **Proper Permissions**: Only necessary permissions (INTERNET, ACCESS_NETWORK_STATE)

### User Experience
- ✅ **Light & Dark Theme Support**: Automatic theme switching based on device settings
- ✅ **Responsive Design**: Optimized for various screen sizes
- ✅ **Safe Area Handling**: Proper spacing for notches and system UI
- ✅ **Smooth Animations**: Native feel with gesture support
- ✅ **Offline Detection**: Clear messaging when internet connection is lost

### Platform-Specific
- ✅ **Android Package**: `com.playme8.igaming`
- ✅ **iOS Bundle ID**: `com.playme8.igaming`
- ✅ **Cross-Platform**: Works on both Android and iOS
- ✅ **Native Performance**: Hardware acceleration enabled

## 📁 Project Structure

```
frontend/
├── app/
│   └── index.tsx              # Main WebView screen
├── config/
│   └── app-config.json        # App configuration (URL, whitelist)
├── assets/
│   └── images/                # App icons and splash screens
├── app.json                   # Expo configuration
└── package.json               # Dependencies
```

## 🔧 Configuration

### Changing the Website URL

Edit `/app/frontend/config/app-config.json`:

```json
{
  "webViewUrl": "https://tyring.org/pm8jkt",
  "allowedUrls": [
    "https://tyring.org/pm8jkt"
  ],
  "appName": "Playme8: Trusted iGaming Mobile Application"
}
```

**Fields:**
- `webViewUrl`: The initial URL to load
- `allowedUrls`: Array of URLs that are allowed for navigation (whitelist)
- `appName`: Display name of the application

### Updating App Name and Identifiers

Edit `/app/frontend/app.json`:

```json
{
  "expo": {
    "name": "Playme8",
    "slug": "playme8-igaming",
    "android": {
      "package": "com.playme8.igaming"
    },
    "ios": {
      "bundleIdentifier": "com.playme8.igaming"
    }
  }
}
```

## 🚀 Running the App

### Development Mode

```bash
cd /app/frontend

# Start Expo development server
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run on web browser (for testing)
yarn web
```

### Testing with Expo Go

1. Install Expo Go app on your Android/iOS device
2. Scan the QR code displayed in terminal or Expo web interface
3. The app will load on your device

## 📦 Building for Production

### Android APK/AAB

```bash
# Install EAS CLI (if not already installed)
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile production

# For APK (instead of AAB)
eas build --platform android --profile preview
```

### iOS IPA

```bash
# Build for iOS
eas build --platform ios --profile production
```

### Build Configuration

Create `eas.json` in the project root:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

## 📱 App Features in Detail

### 1. Network Connectivity
The app automatically detects internet connection status:
- Shows error screen when offline
- Provides retry button to reload
- Monitors connection changes in real-time

### 2. Loading States
Multiple loading indicators for better UX:
- **Progress Bar**: Shows at top of screen during page load
- **Full Screen Loader**: Displays during initial load
- **Loading Percentage**: Tracks page load progress

### 3. Error Handling
Comprehensive error management:
- **Network Errors**: "No internet connection" with retry
- **Page Load Errors**: Shows error details with retry option
- **Unauthorized URLs**: Alert dialog preventing navigation

### 4. URL Security
Strict URL whitelisting implementation:
- Only allows navigation to whitelisted URLs
- Blocks external links automatically
- Alerts user when attempting unauthorized navigation

### 5. Theme Support
Adapts to device theme automatically:
- Light theme: White background, dark text
- Dark theme: Black background, light text
- Smooth transitions between themes

## 🔐 Permissions

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### iOS (Info.plist)
Internet access is enabled by default. No additional permissions needed.

## 🛠️ Troubleshooting

### App Won't Load
1. Check internet connection
2. Verify the URL in `config/app-config.json` is correct
3. Check browser console for errors
4. Try clearing app cache

### Navigation Not Working
1. Ensure back button is enabled in WebView
2. Check if URL is in whitelist
3. Verify JavaScript is enabled

### Build Issues
1. Run `expo doctor` to check for issues
2. Clear cache: `expo start -c`
3. Reinstall dependencies: `rm -rf node_modules && yarn install`

## 📚 Dependencies

### Core Dependencies
- `react-native-webview`: WebView component
- `@react-native-community/netinfo`: Network status detection
- `expo-router`: Navigation and routing
- `react-native-safe-area-context`: Safe area handling

### Development Dependencies
- `typescript`: Type checking
- `eslint`: Code linting
- `@babel/core`: JavaScript compiler

## 🔄 Updating the App

### Minor Updates (URL, text, config)
1. Edit configuration files
2. Restart Expo server: `yarn start`
3. App will hot-reload automatically

### Major Updates (features, dependencies)
1. Install new dependencies: `yarn add [package-name]`
2. Update code
3. Test thoroughly
4. Rebuild app for production

## 📝 Notes

- The app uses file-based routing with Expo Router
- All navigation happens within the WebView (no external browser)
- Hardware acceleration is enabled for smooth performance
- Cache is enabled for faster subsequent loads
- Pull-to-refresh is native and platform-optimized

## 🎨 Customization

### Splash Screen
Replace `/assets/images/splash-icon.png` with your logo

### App Icon
Replace `/assets/images/icon.png` and `/assets/images/adaptive-icon.png`

### Colors
Edit styles in `/app/index.tsx`:
```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Change background color
  },
  progressBar: {
    backgroundColor: '#007AFF', // Change progress bar color
  },
});
```

## 📞 Support

For build and export assistance on the Emergent platform:
- Discord: https://discord.gg/VzKfwCXC4A
- Email: support@emergent.sh

## 📄 License

This app is configured for the Playme8 iGaming platform.

---

**Built with ❤️ using Expo and React Native**
