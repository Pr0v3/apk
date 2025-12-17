# APK Build Troubleshooting & Alternative Methods

## Common EAS Build Errors & Solutions

### Error: "File doesn't exist"

This error can occur for several reasons:

#### Possible Causes:

1. **Build hasn't completed yet**
   - EAS builds take 10-20 minutes
   - Check build status at: https://expo.dev/accounts/[username]/projects/playme8-igaming/builds

2. **Build failed during process**
   - Check build logs for errors
   - Common issues: Missing dependencies, configuration errors

3. **Account/project mismatch**
   - Verify you're logged into the correct Expo account
   - Check project slug matches: `playme8-igaming`

4. **Configuration issues**
   - Missing app.json settings
   - Invalid eas.json configuration

## Solution 1: Verify Build Status

```bash
# Check your builds
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Check build logs
eas build:view [BUILD_ID] --logs
```

## Solution 2: Rebuild with Correct Settings

### Step 1: Clean Setup

```bash
cd /app/frontend

# Login (use correct account)
eas login

# Check current user
eas whoami
```

### Step 2: Initialize Project

```bash
# Configure project
eas build:configure

# This creates/updates eas.json
```

### Step 3: Build APK

```bash
# Build preview APK
eas build --platform android --profile preview --clear-cache

# Monitor build
# URL will be provided in output
```

### Step 4: Download

When build completes:
1. Visit the URL provided
2. Click "Download" button
3. Save APK file

## Solution 3: Alternative Build Method - Expo Export

If EAS continues to fail, use local build:

### Step 1: Export Project

```bash
cd /app/frontend

# Export for production
npx expo export --platform android
```

### Step 2: Use Android Studio

1. Install Android Studio
2. Open project
3. Build APK manually

### Step 3: Or Use Online Services

Upload exported files to:
- AppGyver
- Appetize.io
- Build.phonegap.com

## Solution 4: Download Source Files

I can prepare the complete project for you to build elsewhere.

### What You'll Get:

```
playme8-webview-app/
├── frontend/
│   ├── app/
│   │   └── index.tsx (WebView code)
│   ├── config/
│   │   └── app-config.json (URL settings)
│   ├── assets/
│   ├── app.json
│   ├── eas.json
│   ├── package.json
│   └── README.md
├── BUILD_INSTRUCTIONS.md
└── QUICK_START_GUIDE.md
```

### How to Use:

1. Download ZIP file
2. Extract files
3. Run on your machine:
   ```bash
   cd frontend
   npm install
   eas build --platform android --profile preview
   ```

## Solution 5: Test with Expo Go First (Fastest!)

Before spending time on APK builds:

### Step 1: Install Expo Go

Download from:
- Google Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent
- Scan QR code directly

### Step 2: Access Your App

**Method A: QR Code**
1. Look at your terminal/Expo dashboard
2. You should see a QR code
3. Open Expo Go → Scan QR
4. App loads instantly!

**Method B: Direct URL**
Your app URL: `exp://android-webview-7.preview.emergentagent.com`
- Open Expo Go
- Enter URL manually
- App loads!

### Step 3: Test Everything

- Click all buttons
- Test registration
- Test navigation
- Verify loading times
- Check all features

**Advantages:**
- ✅ Instant testing (no build wait)
- ✅ See changes immediately
- ✅ Test on real device
- ✅ No APK needed for testing
- ✅ Free and fast

## Detailed EAS Build Checklist

### Before Building:

- [ ] Expo account created and verified
- [ ] Logged in with `eas login`
- [ ] Project configured with `eas build:configure`
- [ ] app.json has correct package name
- [ ] eas.json exists with android config
- [ ] All dependencies installed (`yarn install`)
- [ ] No syntax errors in code

### During Build:

- [ ] Build command executed successfully
- [ ] Build ID received
- [ ] Can access build page on Expo website
- [ ] Build status shows "In Queue" or "Building"
- [ ] Wait 10-20 minutes for completion

### After Build:

- [ ] Build status shows "Finished"
- [ ] Download button appears
- [ ] APK file downloads successfully
- [ ] File size is reasonable (30-50MB)
- [ ] APK installs on Android device

## Common Build Errors & Fixes

### Error: "UNAUTHORIZED"
**Fix:**
```bash
eas logout
eas login
eas build --platform android --profile preview
```

### Error: "Project not found"
**Fix:**
```bash
# Verify slug in app.json
cat app.json | grep slug

# Should show: "slug": "playme8-igaming"
```

### Error: "Build failed"
**Fix:**
```bash
# Check logs
eas build:view [BUILD_ID] --logs

# Clear cache and retry
eas build --platform android --profile preview --clear-cache
```

### Error: "Invalid configuration"
**Fix:**
```bash
# Re-configure
eas build:configure

# Answer prompts
# Rebuild
```

## Quick Commands Reference

```bash
# Login
eas login

# Check who's logged in
eas whoami

# Configure project
eas build:configure

# Build APK (preview)
eas build --platform android --profile preview

# Build AAB (production)
eas build --platform android --profile production

# List builds
eas build:list

# View build details
eas build:view [BUILD_ID]

# Cancel build
eas build:cancel [BUILD_ID]

# Clear cache
eas build --platform android --profile preview --clear-cache
```

## Alternative: Pre-Built APK Request

If you're unable to build yourself, you have options:

### Option 1: Hire Developer on Fiverr/Upwork
Cost: $20-50
- Upload source code
- Developer builds APK
- Receive APK in 1-2 days

### Option 2: Use Online Build Services
- Expo EAS (recommended)
- AppGyver
- Ionic Appflow
- CodeMagic

### Option 3: Request from Support
Contact Emergent support with:
- Your project details
- Build requirements
- Timeline needed

## Project Export for Manual Build

Would you like me to create a downloadable package?

### I can provide:

1. **Complete source code ZIP**
   - All files needed
   - Build instructions
   - Configuration guide

2. **Docker container**
   - Pre-configured environment
   - One-command build

3. **GitHub repository**
   - Version controlled
   - Easy to share with developers
   - CI/CD ready

Let me know which option you prefer!

## Recommended Path Forward

### For Quick Testing (Now):
1. ✅ Use Expo Go app
2. ✅ Scan QR code
3. ✅ Test all features
4. ✅ Verify everything works

### For APK Build (Later):
1. ✅ Follow EAS build steps carefully
2. ✅ Check for errors in logs
3. ✅ Wait for build to complete
4. ✅ Download and test APK

### If Still Stuck:
1. ✅ Share error screenshots
2. ✅ Send build logs
3. ✅ I'll diagnose specific issue
4. ✅ Provide exact solution

## Contact & Support

**Need Help?**
- Share error screenshot
- Copy/paste error message
- Send build log URL
- I'll provide specific fix

**Works Best:**
1. Screenshot of error
2. Exact error text
3. Steps you took
4. What you expected

I'm here to help! Let me know what specific error you're seeing and I'll provide the exact solution.
