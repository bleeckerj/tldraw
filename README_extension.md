# Tldraw Selection Foreground Customization

This fork of `tldraw` introduces the ability to customize the **Selection Outline** and **Selection Corner Handles** via the `components` prop. This allows for complete styling control over the selection UI (e.g., changing colors, using round handles, or hiding elements) without modifying the core package or relying on fragile CSS overrides.

## Modifications

The following changes were made to the codebase to expose these components:

1.  **`packages/editor/src/lib/hooks/useEditorComponents.tsx`**:
    *   Added `SelectionCornerHandle` and `SelectionOutline` to the `TLEditorComponents` interface.
    *   Defined `TLSelectionCornerHandleProps` and `TLSelectionOutlineProps`.

2.  **`packages/editor/src/lib/components/default-components/`**:
    *   Created `DefaultSelectionCornerHandle.tsx`: The default square handle implementation.
    *   Created `DefaultSelectionOutline.tsx`: The default rectangular outline implementation.

3.  **`packages/tldraw/src/lib/canvas/TldrawSelectionForeground.tsx`**:
    *   Updated to retrieve `SelectionCornerHandle` and `SelectionOutline` from `useEditorComponents()`.
    *   Replaced hardcoded SVG `<rect>` elements with these dynamic components.

## Integration Guide

### 1. Building the Package

To use this fork, you first need to build the packages. From the root of the repository:

```bash
# Install dependencies
yarn install

# Build the packages
yarn build
```

### 2. Linking or Publishing

You can consume this fork in your application in a few ways:

*   **Yalc (Recommended for local dev):** Use `yalc publish` in `packages/tldraw` and `yalc add @tldraw/tldraw` in your app.
*   **NPM Link:** Use `npm link` or `yarn link`.
*   **Tarball:** Run `yarn pack` in `packages/tldraw` and install the resulting `.tgz` file.
*   **Scoped Registry:** Publish to a private registry or GitHub Packages under a custom scope (e.g., `@my-org/tldraw`).

### 3. Usage in Your Application

Once installed, you can override the selection components by passing them to the `components` prop of the `Tldraw` component.

#### Example: Round Handles and Red Outline

```tsx
import { Tldraw, TLSelectionCornerHandleProps, TLSelectionOutlineProps } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'

// 1. Define your custom Handle component
const MyRoundHandle = ({ x, y, width, height, className }: TLSelectionCornerHandleProps) => {
  // Note: x and y are top-left coordinates. For a circle, we calculate the center.
  const cx = x + width / 2
  const cy = y + height / 2
  const r = width / 2

  return (
    <circle
      className={className}
      cx={cx}
      cy={cy}
      r={r}
      // You can apply custom styles directly or via className
      style={{ fill: 'white', stroke: 'blue', strokeWidth: 2 }}
    />
  )
}

// 2. Define your custom Outline component
const MyCustomOutline = ({ width, height, className }: TLSelectionOutlineProps) => {
  return (
    <rect
      className={className}
      width={width}
      height={height}
      rx={8} // Rounded corners for the selection box
      ry={8}
      style={{ 
        stroke: 'red', 
        strokeWidth: 2, 
        fill: 'rgba(255, 0, 0, 0.1)' 
      }}
    />
  )
}

// 3. Pass them to the Tldraw component
export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        components={{
          SelectionCornerHandle: MyRoundHandle,
          SelectionOutline: MyCustomOutline,
        }}
      />
    </div>
  )
}
```

## Component Props

### `SelectionCornerHandle`
Receives `TLSelectionCornerHandleProps`:
*   `x`: number (Top-left X coordinate)
*   `y`: number (Top-left Y coordinate)
*   `width`: number (Width of the handle area)
*   `height`: number (Height of the handle area)
*   `className`: string (Standard tldraw class, e.g., `tl-corner-handle`)

### `SelectionOutline`
Receives `TLSelectionOutlineProps`:
*   `width`: number (Width of the selection box)
*   `height`: number (Height of the selection box)
*   `className`: string (Standard tldraw class, e.g., `tl-selection__fg__outline`)

## Important Notes

*   **Hit Testing:** The "grab-able" area for resizing is handled by separate, invisible elements (`ResizeHandle`) within Tldraw. Customizing the visible `SelectionCornerHandle` or `SelectionOutline` **does not** affect the hit area. You can make your handles smaller, larger, or transparent, and the mouse interaction will still work as expected based on the standard hit targets.
*   **SVG Context:** These components are rendered inside an `<svg>` element. Ensure you return valid SVG elements (like `<rect>`, `<circle>`, `<path>`, `<g>`), not HTML elements like `<div>`.
