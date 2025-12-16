import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
  RefreshControl,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import appConfig from '../config/app-config.json';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(appConfig.webViewUrl);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Check network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      if (!state.isConnected) {
        setError('No internet connection');
      } else {
        setError(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  // Check if URL is allowed
  const isUrlAllowed = (url: string): boolean => {
    // Allow all URLs - no restrictions on navigation
    // This enables redirects to payment gateways, social logins, etc.
    return true;
  };

  // Handle navigation state change
  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);
  };

  // Handle should start load - allow navigation within the same domain
  const handleShouldStartLoad = (request: any): boolean => {
    const { url } = request;
    // Allow all navigation within the same domain
    return isUrlAllowed(url);
  };

  // Handle load start
  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
    
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    
    // Set a timeout to force-stop loading after 15 seconds
    const timeout = setTimeout(() => {
      console.log('Loading timeout - forcing load complete');
      setIsLoading(false);
      setRefreshing(false);
    }, 15000); // 15 seconds timeout (reduced for better UX)
    
    setLoadingTimeout(timeout);
  };

  // Handle load end
  const handleLoadEnd = () => {
    setIsLoading(false);
    setRefreshing(false);
    
    // Clear the timeout since loading completed
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  };

  // Handle load progress
  const handleLoadProgress = ({ nativeEvent }: any) => {
    setLoadingProgress(nativeEvent.progress);
    
    // If progress reaches 100%, ensure loading state is cleared
    if (nativeEvent.progress === 1) {
      setTimeout(() => {
        setIsLoading(false);
        setRefreshing(false);
      }, 1000); // Give 1 second for final rendering
    }
  };

  // Handle error
  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setIsLoading(false);
    setError(`Error loading page: ${nativeEvent.description}`);
  };

  // Handle pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  // Retry loading
  const retryLoad = () => {
    setError(null);
    setIsLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  // Show error screen
  if (error && !isConnected) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorIcon, isDark && styles.textDark]}>⚠️</Text>
          <Text style={[styles.errorTitle, isDark && styles.textDark]}>No Internet Connection</Text>
          <Text style={[styles.errorMessage, isDark && styles.textDark]}>
            Please check your internet connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={retryLoad}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Loading Progress Bar */}
      {isLoading && loadingProgress < 1 && (
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${loadingProgress * 100}%` }
            ]} 
          />
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.loadingText, isDark && styles.textDark]}>Loading...</Text>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: appConfig.webViewUrl }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onLoadProgress={handleLoadProgress}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        onRefresh={onRefresh}
        refreshing={refreshing}
        // Security settings
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // Performance optimizations
        cacheEnabled={true}
        incognito={false}
        // Android specific
        androidHardwareAccelerationDisabled={false}
        androidLayerType="hardware"
        // iOS specific
        allowsLinkPreview={false}
        // Mixed content mode for Android (allow HTTPS and HTTP)
        mixedContentMode="always"
        // Additional props to help with loading
        originWhitelist={['*']}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        // Inject JavaScript to help detect when page is fully loaded
        injectedJavaScript={`
          // Force trigger load complete event
          window.addEventListener('load', function() {
            console.log('Page fully loaded');
          });
          
          // Additional check for readyState
          if (document.readyState === 'complete') {
            console.log('Document ready');
          }
          true;
        `}
      />

      {/* Error Display */}
      {error && isConnected && (
        <View style={styles.errorOverlay}>
          <View style={[styles.errorCard, isDark && styles.errorCardDark]}>
            <Text style={[styles.errorIcon, isDark && styles.textDark]}>❌</Text>
            <Text style={[styles.errorTitle, isDark && styles.textDark]}>Error Loading Page</Text>
            <Text style={[styles.errorMessage, isDark && styles.textDark]}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={retryLoad}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  webview: {
    flex: 1,
  },
  progressBarContainer: {
    height: 3,
    width: '100%',
    backgroundColor: '#E0E0E0',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  textDark: {
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  errorCardDark: {
    backgroundColor: '#1C1C1E',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});