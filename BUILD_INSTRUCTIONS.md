# Build Instructions for Playme8 WebView App

## 📦 Building APK/AAB Files

This document provides step-by-step instructions to build Android APK and AAB files for the Playme8 iGaming WebView application.

## Prerequisites

Before building, ensure you have:
1. An Expo account (create one at https://expo.dev)
2. EAS CLI installed
3. Git installed (optional but recommended)

## Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

Or with yarn:
```bash
yarn global add eas-cli
```

## Step 2: Login to Expo

```bash
cd /app/frontend
eas login
```

Enter your Expo account credentials when prompted.

## Step 3: Configure the Project

The project is already configured with `eas.json`. Review the configuration:

```bash
cat eas.json
```

You should see three build profiles:
- **development**: For development builds with debug features
- **preview**: Generates APK files for testing
- **production**: Generates AAB files for Google Play Store

## Step 4: Build Android APK (For Testing/Direct Installation)

To build an APK file that can be directly installed on Android devices:

```bash
eas build --platform android --profile preview
```

This will:
1. Upload your code to Expo servers
2. Build the APK in the cloud
3. Provide a download link when complete

**Build time**: Approximately 10-20 minutes

## Step 5: Build Android AAB (For Google Play Store)

To build an AAB file for Google Play Store submission:

```bash
eas build --platform android --profile production
```

**Note**: AAB (Android App Bundle) is required for Google Play Store uploads.

## Step 6: Download Your Build

After the build completes:
1. You'll receive a download URL in the terminal
2. Or visit https://expo.dev/accounts/[your-username]/projects/playme8-igaming/builds
3. Click on the latest build
4. Download the APK or AAB file

## Step 7: Install APK on Android Device

### Method 1: Direct Installation
1. Transfer the APK file to your Android device
2. Open the APK file on your device
3. Allow installation from unknown sources if prompted
4. Follow the installation prompts

### Method 2: Using ADB
```bash
adb install path/to/your-app.apk
```

## Building for iOS (IPA)

To build for iOS:

```bash
eas build --platform ios --profile production
```

**Requirements**:
- Apple Developer Account ($99/year)
- Provisioning profiles and certificates

## Build Configuration Details

### Preview Profile (APK)
```json
{
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```
- Creates APK file
- For internal testing
- Can be installed directly on devices

### Production Profile (AAB)
```json
{
  "android": {
    "buildType": "app-bundle"
  }
}
```
- Creates AAB file
- Required for Google Play Store
- Optimized for distribution

## Advanced Build Options

### Build with Specific App Version

Update `version` in `app.json`:
```json
{
  "expo": {
    "version": "1.0.1"
  }
}
```

Then build:
```bash
eas build --platform android --profile production
```

### Build for Both Platforms Simultaneously

```bash
eas build --platform all --profile production
```

### Check Build Status

```bash
eas build:list
```

### View Build Details

```bash
eas build:view [build-id]
```

## Local Build (Alternative Method)

If you prefer building locally without EAS:

### Setup Local Android Build

1. Install Android Studio
2. Setup Android SDK
3. Configure environment variables

```bash
# Build locally
npx expo run:android --variant release
```

This generates an APK at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

### Build Fails with "Invalid credentials"
```bash
eas login --force
eas build:configure
```

### Build Fails with "Native module error"
The app uses only compatible native modules. If you see this error:
1. Check that all dependencies are installed: `yarn install`
2. Clear cache: `expo start -c`

### APK Installation Blocked
Enable "Install from unknown sources" on your Android device:
- Settings > Security > Unknown sources (Android 7 and below)
- Settings > Apps > Special access > Install unknown apps (Android 8+)

### Build Taking Too Long
EAS builds are queued. Free tier may have longer wait times.
- Check build queue: `eas build:list`
- Consider upgrading to paid Expo plan for faster builds

## Signing Your App

### Generate Keystore (For Google Play)

EAS automatically generates and manages keystores. To use your own:

1. Generate keystore:
```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure in `eas.json`:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "credentialsSource": "local"
      }
    }
  }
}
```

3. Provide credentials during build:
```bash
eas build --platform android --profile production
```

## Continuous Integration (CI/CD)

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - run: yarn install
      - run: npx eas-cli build --platform android --non-interactive --profile production
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## Publishing to Google Play Store

1. Build AAB file (production profile)
2. Visit Google Play Console (https://play.google.com/console)
3. Create new app or select existing
4. Navigate to Release > Production
5. Upload AAB file
6. Fill in store listing details
7. Submit for review

**First-time setup**:
- Create developer account ($25 one-time fee)
- Complete app information
- Add screenshots and descriptions
- Set up content rating
- Complete privacy policy requirements

## Publishing to Apple App Store

1. Build IPA file (production profile)
2. Visit App Store Connect (https://appstoreconnect.apple.com)
3. Create new app
4. Upload IPA using Transporter app
5. Fill in app information
6. Submit for review

**Requirements**:
- Apple Developer Account ($99/year)
- App screenshots for different device sizes
- App description and keywords
- Privacy policy

## Build Checklist

Before building for production:

- [ ] Update app version in `app.json`
- [ ] Update `versionCode` for Android in `app.json`
- [ ] Update `buildNumber` for iOS in `app.json`
- [ ] Test app thoroughly on Expo Go
- [ ] Update app icons and splash screen
- [ ] Review and update `config/app-config.json`
- [ ] Ensure proper URL whitelisting
- [ ] Test offline functionality
- [ ] Review permissions in `app.json`
- [ ] Prepare store listing materials (screenshots, description)
- [ ] Have privacy policy ready (if required)

## Post-Build Steps

1. **Test the APK/AAB**
   - Install on multiple Android devices
   - Test all features (loading, navigation, refresh, etc.)
   - Test on different Android versions
   - Test network connectivity handling

2. **Prepare for Store Submission**
   - Create promotional graphics
   - Write app description
   - Take screenshots
   - Prepare privacy policy
   - Set up support email/website

3. **Submit to Store**
   - Upload APK/AAB
   - Complete all required fields
   - Submit for review
   - Monitor review status

## Version Management

Update version before each build in `app.json`:

```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    },
    "ios": {
      "buildNumber": "1"
    }
  }
}
```

**Version format**: MAJOR.MINOR.PATCH (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

## Cost Considerations

### Expo EAS Build
- **Free tier**: Limited builds per month
- **Paid tiers**: Starting at $29/month for more builds
- **Enterprise**: Custom pricing

### App Stores
- **Google Play**: $25 one-time registration fee
- **Apple App Store**: $99/year developer account

## Support and Resources

- **Expo Documentation**: https://docs.expo.dev
- **EAS Build Guide**: https://docs.expo.dev/build/introduction/
- **Expo Discord**: https://chat.expo.dev
- **React Native Docs**: https://reactnative.dev

## Quick Reference Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Build APK (testing)
eas build --platform android --profile preview

# Build AAB (production)
eas build --platform android --profile production

# Build iOS
eas build --platform ios --profile production

# Check builds
eas build:list

# Download build
# Visit: https://expo.dev/accounts/[username]/projects/playme8-igaming/builds
```

## Notes

- First build may take longer as Expo sets up credentials
- Subsequent builds are faster
- Keep your keystore safe - losing it means you cannot update your app
- EAS manages keystores automatically unless you specify custom ones
- Free tier has build queue - paid tiers have priority

---

**Need help?** Contact Emergent support:
- Discord: https://discord.gg/VzKfwCXC4A
- Email: support@emergent.sh
