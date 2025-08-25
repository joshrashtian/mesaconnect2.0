// Kiosk configuration for different build targets
export interface KioskConfig {
  isKioskApp: boolean;
  isWebApp: boolean;
  target: 'web' | 'kiosk' | 'both';
  features: {
    externalApps: boolean;
    fullscreen: boolean;
    autoRefresh: boolean;
    navigationBlocking: boolean;
    urlActivation: boolean;
  };
  ui: {
    showHeader: boolean;
    showFooter: boolean;
    showExitButton: boolean;
    showExternalAppButtons: boolean;
  };
}

// Web app configuration
export const webConfig: KioskConfig = {
  isKioskApp: false,
  isWebApp: true,
  target: 'web',
  features: {
    externalApps: true,
    fullscreen: true,
    autoRefresh: false,
    navigationBlocking: false,
    urlActivation: true,
  },
  ui: {
    showHeader: true,
    showFooter: true,
    showExitButton: true,
    showExternalAppButtons: true,
  },
};

// Kiosk app configuration (for Raspberry Pi)
export const kioskConfig: KioskConfig = {
  isKioskApp: true,
  isWebApp: false,
  target: 'kiosk',
  features: {
    externalApps: true,
    fullscreen: true,
    autoRefresh: true,
    navigationBlocking: true,
    urlActivation: false, // Kiosk app doesn't need URL activation
  },
  ui: {
    showHeader: true,
    showFooter: true,
    showExitButton: false, // No exit button in kiosk mode
    showExternalAppButtons: true,
  },
};

// Get configuration based on environment
export const getKioskConfig = (): KioskConfig => {
  const target = process.env.NEXT_PUBLIC_APP_TARGET || 'web';
  
  switch (target) {
    case 'kiosk':
      return kioskConfig;
    case 'web':
    default:
      return webConfig;
  }
};

// Helper functions
export const isKioskApp = () => getKioskConfig().isKioskApp;
export const isWebApp = () => getKioskConfig().isWebApp;
export const shouldShowExitButton = () => getKioskConfig().ui.showExitButton;
export const shouldShowExternalApps = () => getKioskConfig().features.externalApps;
