# MESA Connect Kiosk Mode System

A comprehensive kiosk mode system for MESA Connect that supports URL-based activation, external app integration (Spotify, Zoom), and customizable settings.

## Features

- **URL-Based Activation**: Activate kiosk mode using URL parameters
- **Multiple Kiosk Types**: Default, Spotify, Zoom, and Custom modes
- **External App Integration**: Direct links to Spotify and Zoom
- **Fullscreen Support**: Automatic fullscreen mode
- **Navigation Control**: Prevent users from leaving the kiosk
- **Auto-Refresh**: Automatic page refresh for continuous operation
- **Persistent Settings**: Settings saved to localStorage
- **Responsive Design**: Works on various screen sizes

## Quick Start

### 1. Basic Usage

Wrap your app with the `KioskModeProvider`:

```tsx
import { KioskModeProvider } from "@/_contexts/KioskModeContext";

function App() {
  return (
    <KioskModeProvider>
      <YourAppContent />
    </KioskModeProvider>
  );
}
```

### 2. Using KioskModeWrapper

Wrap any page or component with `KioskModeWrapper` for automatic kiosk styling:

```tsx
import KioskModeWrapper from "@/_components/KioskModeWrapper";

function MyPage() {
  return (
    <KioskModeWrapper showKioskToggle={true}>
      <div>Your page content</div>
    </KioskModeWrapper>
  );
}
```

### 3. Using the Hook

Access kiosk mode functionality in any component:

```tsx
import { useKioskMode } from "@/_contexts/KioskModeContext";

function MyComponent() {
  const {
    isKioskMode,
    kioskType,
    activateKioskMode,
    deactivateKioskMode,
    openExternalApp,
  } = useKioskMode();

  return (
    <div>
      <button onClick={() => activateKioskMode("spotify")}>
        Activate Spotify Kiosk
      </button>
      <button onClick={() => openExternalApp("spotify")}>Open Spotify</button>
    </div>
  );
}
```

## URL Parameters

### Activating Kiosk Mode

Add these parameters to any URL to activate kiosk mode:

```
?kiosk=true&kioskType=default
?kiosk=true&kioskType=spotify
?kiosk=true&kioskType=zoom
?kiosk=true&kioskType=custom
```

### Examples

- **Default Kiosk**: `https://yourdomain.com/page?kiosk=true&kioskType=default`
- **Spotify Kiosk**: `https://yourdomain.com/page?kiosk=true&kioskType=spotify`
- **Zoom Kiosk**: `https://yourdomain.com/page?kiosk=true&kioskType=zoom`
- **Custom Kiosk**: `https://yourdomain.com/page?kiosk=true&kioskType=custom`

### Deactivating Kiosk Mode

```
?kiosk=false
```

## Kiosk Types

### 1. Default Kiosk

- Standard kiosk mode with full functionality
- Blue to purple gradient background
- All features enabled

### 2. Spotify Kiosk

- Optimized for music/entertainment environments
- Green to emerald gradient background
- Quick access to Spotify

### 3. Zoom Kiosk

- Optimized for video conferencing
- Blue to cyan gradient background
- Quick access to Zoom

### 4. Custom Kiosk

- Fully customizable settings
- Gray to slate gradient background
- Advanced configuration options

## External App Integration

### Spotify

- **Default URL**: `https://open.spotify.com`
- **Usage**: `openExternalApp("spotify")`
- **Customization**: Update URL in settings

### Zoom

- **Default URL**: `https://zoom.us`
- **Usage**: `openExternalApp("zoom")`
- **Customization**: Update URL in settings

## Settings

### Kiosk Settings

| Setting             | Description                  | Default     |
| ------------------- | ---------------------------- | ----------- |
| `fullscreen`        | Auto-enter fullscreen mode   | `false`     |
| `autoRefresh`       | Auto-refresh every 5 minutes | `false`     |
| `disableNavigation` | Prevent leaving the page     | `false`     |
| `customTheme`       | Custom theme identifier      | `"default"` |

### External App Settings

| App     | Setting   | Description                | Default                    |
| ------- | --------- | -------------------------- | -------------------------- |
| Spotify | `enabled` | Enable Spotify integration | `true`                     |
| Spotify | `url`     | Spotify URL                | `https://open.spotify.com` |
| Zoom    | `enabled` | Enable Zoom integration    | `true`                     |
| Zoom    | `url`     | Zoom URL                   | `https://zoom.us`          |

## Components

### KioskModeToggle

A complete toggle component with settings:

```tsx
import KioskModeToggle from "@/_components/KioskModeToggle";

<KioskModeToggle showSettings={true} />;
```

### KioskModeWrapper

A wrapper component that applies kiosk styling:

```tsx
import KioskModeWrapper from "@/_components/KioskModeWrapper";

<KioskModeWrapper
  showKioskToggle={true}
  forceKioskMode={false}
  className="custom-class"
>
  <YourContent />
</KioskModeWrapper>;
```

## API Reference

### useKioskMode Hook

```tsx
const {
  isKioskMode, // boolean
  kioskType, // "default" | "spotify" | "zoom" | "custom"
  externalApps, // External app configuration
  kioskSettings, // Kiosk settings
  activateKioskMode, // Function to activate kiosk mode
  deactivateKioskMode, // Function to deactivate kiosk mode
  openExternalApp, // Function to open external apps
  updateKioskSettings, // Function to update settings
} = useKioskMode();
```

### Methods

#### activateKioskMode(type?)

Activates kiosk mode with optional type parameter.

```tsx
activateKioskMode(); // Default kiosk
activateKioskMode("spotify"); // Spotify kiosk
activateKioskMode("zoom"); // Zoom kiosk
activateKioskMode("custom"); // Custom kiosk
```

#### deactivateKioskMode()

Deactivates kiosk mode and exits fullscreen.

#### openExternalApp(app)

Opens an external application.

```tsx
openExternalApp("spotify");
openExternalApp("zoom");
```

#### updateKioskSettings(settings)

Updates kiosk settings.

```tsx
updateKioskSettings({
  fullscreen: true,
  autoRefresh: false,
  disableNavigation: true,
});
```

## Demo Page

Visit `/kiosk-demo` to see the kiosk mode system in action with all features demonstrated.

## Browser Compatibility

- **Fullscreen API**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **localStorage**: All modern browsers
- **URLSearchParams**: All modern browsers

## Security Considerations

- Kiosk mode can prevent users from leaving the page
- Fullscreen mode requires user interaction
- External app links open in new tabs/windows
- Settings are stored in localStorage (client-side only)

## Troubleshooting

### Kiosk Mode Not Activating

1. Check URL parameters are correct
2. Ensure `KioskModeProvider` is wrapping your app
3. Check browser console for errors

### Fullscreen Not Working

1. Fullscreen requires user interaction
2. Check browser permissions
3. Some browsers may block fullscreen in certain contexts

### External Apps Not Opening

1. Check if apps are enabled in settings
2. Verify URLs are correct
3. Check browser popup blockers

## Contributing

When adding new kiosk types or external apps:

1. Update the `KioskModeContextType` interface
2. Add new kiosk type to the context
3. Update the `KioskModeToggle` component
4. Add appropriate styling in `KioskModeWrapper`
5. Update this documentation
