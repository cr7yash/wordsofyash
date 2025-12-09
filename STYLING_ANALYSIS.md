# Astro Blog Template - Styling Architecture Analysis

## Overview
This Astro blog template uses a modern styling stack combining **Tailwind CSS v4**, **shadcn/ui components**, **CSS custom properties (variables)**, and **OKLCH color space** for theme management. The styling is completely CSS variable-based with support for light and dark modes via the `data-theme` attribute.

---

## 1. Main Styling Configuration Files

### A. **Astro Configuration** (`astro.config.ts`)
- **Location**: `/Volumes/Arasaka/wordsofyash/astro.config.ts`
- **Key Details**:
  - Uses `@tailwindcss/vite` v4.0.7 plugin for Tailwind CSS integration
  - Configures Expressive Code for syntax highlighting with GitHub themes
  - Theme CSS selector: `[data-theme="${theme.name.split('-')[1]}"]` (switches between "light" and "dark")
  - Uses CSS variables for styling expressive code blocks
  - Supports markdown with MDX, RSS, and sitemap integrations

### B. **shadcn/ui Configuration** (`components.json`)
- **Location**: `/Volumes/Arasaka/wordsofyash/components.json`
- **Configuration**:
  ```json
  {
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "src/styles/global.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    }
  }
  ```
- **Path Aliases**:
  - `@/components` → `src/components`
  - `@/utils` → `src/lib/utils`
  - `@/ui` → `src/components/ui`
  - `@/lib` → `src/lib`
  - `@/hooks` → `src/hooks`

### C. **TypeScript Configuration** (`tsconfig.json`)
- **Location**: `/Volumes/Arasaka/wordsofyash/tsconfig.json`
- **Path mapping**: `@/*` resolves to `./src/*`
- **JSX handling**: Uses `react-jsx` mode with React v19

### D. **Tailwind CSS 4.0 Configuration**
- **Note**: No separate `tailwind.config.ts` or `tailwind.config.js` file found
- **Configuration Method**: **Inline in CSS** (See section 2 below)
- Uses Tailwind CSS v4.1.7 with vite plugin integration
- Supports custom theme configuration via `@theme` directive in CSS

---

## 2. Color System and Themes Structure

### A. **Global CSS Variables** (`src/styles/global.css`)
- **Location**: `/Volumes/Arasaka/wordsofyash/src/styles/global.css`
- **Color Space**: Uses **OKLCH** (Perceptually uniform color space)
- **Custom Variant**: Defines a custom `dark` variant for the `[data-theme=dark]` attribute

#### Light Theme (`:root`)
```css
:root {
  --background: oklch(1 0 0);              /* White */
  --foreground: oklch(0.145 0 0);          /* Near black */
  --primary: oklch(0.205 0 0);             /* Dark accent */
  --primary-foreground: oklch(0.985 0 0);  /* Light text */
  --muted: oklch(0.97 0 0);                /* Light gray */
  --muted-foreground: oklch(0.556 0 0);    /* Medium gray */
  --destructive: oklch(0.577 0.245 27.325);/* Red/orange */
  --border: oklch(0.922 0 0);              /* Light border */
  --ring: oklch(0.708 0 0);                /* Focus ring */
}
```

#### Dark Theme (`[data-theme='dark']`)
```css
[data-theme='dark'] {
  --background: oklch(0.145 0 0);          /* Dark background */
  --foreground: oklch(0.985 0 0);          /* Light text */
  --primary: oklch(0.922 0 0);             /* Light accent */
  --primary-foreground: oklch(0.205 0 0);  /* Dark text */
  --muted: oklch(0.269 0 0);               /* Dark gray */
  --muted-foreground: oklch(0.708 0 0);    /* Light gray text */
  --destructive: oklch(0.704 0.191 22.216);/* Adjusted red */
  --border: oklch(1 0 0 / 10%);            /* Subtle border */
  --ring: oklch(0.556 0 0);                /* Focus ring */
}
```

### B. **Tailwind Theme Configuration** (Inline in CSS)
Located in `src/styles/global.css` via `@theme` directive:
```css
@theme inline {
  --font-sans: Geist, ui-sans-serif, system-ui, sans-serif, ...;
  --font-mono: Geist Mono, ui-monospace, SFMono-Regular, ...;
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
}
```

### C. **Font Configuration**
- **Sans-serif**: Geist (custom variable font)
- **Monospace**: Geist Mono (custom variable font)
- Fonts loaded from `/public/fonts/` using WOFF2 format with font-display: swap

### D. **Custom CSS Variant for Dark Mode**
```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```
- Allows `dark:` prefix to work with `[data-theme="dark"]` selector
- More flexible than default media-query based dark mode

---

## 3. Component Styles Definition

### A. **UI Component Library: shadcn/ui**
- **Location**: `/Volumes/Arasaka/wordsofyash/src/components/ui/`
- **Framework**: React components with Tailwind CSS
- **Library**: Built on top of **Radix UI** primitives
- **Styling Utility**: Uses **CVA (Class Variance Authority)** for variant management

#### UI Components Included:
1. **button.tsx** - Button with multiple variants (default, destructive, outline, muted, ghost, link)
2. **badge.tsx** - Badge with variants (default, muted, destructive, outline)
3. **avatar.tsx** - Avatar component wrapping Radix UI
4. **breadcrumb.tsx** - Breadcrumb navigation
5. **pagination.tsx** - Pagination controls
6. **scroll-area.tsx** - Scrollable area with custom scrollbar
7. **separator.tsx** - Visual separator

### B. **Button Component Styling Pattern** (Example)
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ...",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90 ...',
        outline: 'border bg-background hover:bg-muted ...',
        muted: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'hover:bg-muted hover:text-foreground ...',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
  }
)
```

### C. **Astro Components**
- **Location**: `/Volumes/Arasaka/wordsofyash/src/components/`
- Built-in support for Tailwind classes
- Main layout components:
  - `Header.astro` - Navigation header with theme toggle
  - `Footer.astro` - Footer section
  - `BlogCard.astro` - Blog post card with metadata
  - `AuthorCard.astro` - Author information card
  - `Callout.astro` - Content callout/admonition box
  - `PostNavigation.astro` - Post navigation
  - `TOCSidebar.astro` / `TOCHeader.astro` - Table of contents
  - `Breadcrumbs.astro` - Breadcrumb navigation

### D. **Callout Component Styling** (Advanced Example)
Demonstrates color-coded callouts for different content types:
```typescript
const calloutConfig = {
  note: { style: 'border-blue-500 dark:bg-blue-950/5', ... },
  tip: { style: 'border-green-500 dark:bg-green-950/5', ... },
  warning: { style: 'border-amber-500 dark:bg-amber-950/5', ... },
  danger: { style: 'border-red-500 dark:bg-red-950/5', ... },
  // ... 15+ more content types
}
```
Uses CVA for variant management with dynamic color configuration

---

## 4. UI Component Library Configuration

### A. **Radix UI**
- **Version**: v1.3.4
- **Purpose**: Unstyled, accessible UI components
- Used as base for all UI components in `src/components/ui/`
- Provides accessibility and keyboard navigation primitives

### B. **Class Variance Authority (CVA)**
- **Version**: v0.7.1
- **Purpose**: Type-safe variant management for styled components
- **Usage Pattern**:
  ```typescript
  const buttonVariants = cva(baseStyles, {
    variants: { variant: {...}, size: {...} },
    defaultVariants: { variant: 'default', size: 'default' }
  })
  ```
- Composable variant system for flexible styling

### C. **Utility Functions**
- **Location**: `/Volumes/Arasaka/wordsofyash/src/lib/utils.ts`
- **Main Function**: `cn()` - Merges Tailwind classes with conflict resolution
  ```typescript
  import { clsx } from 'clsx'
  import { twMerge } from 'tailwind-merge'
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```
- Uses `clsx` for conditional classes and `tailwind-merge` to resolve conflicts

### D. **Related Dependencies**
- `lucide-react` v0.469.0 - Icon library (React)
- `astro-icon` v1.1.5 - Icon integration for Astro
- `@iconify-json/lucide` - Icon set for Astro

---

## 5. Global Styles and Design Tokens

### A. **Global CSS** (`src/styles/global.css`)
**Key Features**:
- Imports Tailwind CSS v4 using `@import 'tailwindcss'`
- Defines custom dark mode variant
- Establishes theme CSS variables
- Font face declarations for Geist fonts
- Base layer styles with @layer directive

**Base Layer Styling**:
```css
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    @apply border-border outline-ring/50 tracking-tight;
  }
}
```

### B. **Typography CSS** (`src/styles/typography.css`)
- **Location**: `/Volumes/Arasaka/wordsofyash/src/styles/typography.css`
- **Purpose**: Blog content styling via `.prose` class

**Key Styling Includes**:
- Heading sizing and spacing (h1-h6)
- Paragraph and list styling
- Link styling with color transitions
- Code block and inline code styling
- Table styling with borders
- Blockquote styling
- Image and video container styling
- Math/KaTeX display styling

**Example - Heading Styles**:
```css
:where(h2):not(:where(.not-prose, .not-prose *)) {
  @apply mt-8 mb-4 text-2xl;
}
```

**Prose Configuration Utilities**:
- `@apply text-balance` - Better heading wrapping
- `@apply text-pretty` - Better paragraph wrapping
- `@apply wrap-break-word` - Word break handling
- Responsive scroll margins for heading anchors

### C. **Design Tokens**
Colors and spacing are entirely CSS variable-based:
- **Colors**: 6 primary tokens (background, foreground, primary, muted, destructive, border, ring)
- **Fonts**: 2 font stacks (sans-serif and monospace)
- **Spacing**: Standard Tailwind spacing scale
- **Typography**: Configured via Tailwind utilities

---

## 6. Dark Mode Implementation

### A. **Theme Toggle Component** (`ThemeToggle.astro`)
- **Location**: `/Volumes/Arasaka/wordsofyash/src/components/ThemeToggle.astro`
- **Method**: Data attribute based (`data-theme="light"` or `data-theme="dark"`)

**Theme Detection Logic**:
```typescript
const theme = (() => {
  const stored = localStorage?.getItem('theme') ?? ''
  if (['dark', 'light'].includes(stored)) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
})()
```

**Features**:
- Reads from localStorage if available
- Falls back to system preference via `prefers-color-scheme` media query
- Sets `data-theme` attribute on document root
- Icons switch between sun (light) and moon (dark)
- Smooth transitions with transition-none optimization

### B. **Theme Persistence**
- Stored in `localStorage` under key "theme"
- Persists across browser sessions
- Set immediately on page load with inline script
- Rehydrated after Astro view transitions

### C. **Smooth Theme Switching**
```typescript
function handleToggleClick() {
  const element = document.documentElement
  const currentTheme = element.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  // Prevent transition flash
  element.classList.add('[&_*]:transition-none')
  element.setAttribute('data-theme', newTheme)
  window.getComputedStyle(element).getPropertyValue('opacity') // Force reflow
  
  requestAnimationFrame(() => {
    element.classList.remove('[&_*]:transition-none')
  })

  localStorage.setItem('theme', newTheme)
}
```
- Uses `transition-none` class to prevent flash on toggle
- Forces reflow to apply changes
- Uses requestAnimationFrame for clean removal

### D. **Dark Mode CSS Patterns**
- **Custom Variant Syntax**: `dark:bg-blue-950/5` works with `[data-theme="dark"]`
- **Specific Examples**:
  ```css
  /* Light mode */
  border-blue-500
  
  /* Dark mode */
  dark:bg-blue-950/5
  dark:text-blue-300
  ```

### E. **Expressive Code Dark Mode**
- Configured in `astro.config.ts`:
  ```typescript
  themeCssSelector: (theme) => `[data-theme="${theme.name.split('-')[1]}"]`
  useDarkModeMediaQuery: false
  themes: ['github-light', 'github-dark']
  ```
- Syntax highlighting adapts to light/dark theme
- CSS variables for styling code blocks: `--border`, `--muted`, `--muted-foreground`

---

## 7. How Everything Works Together

### A. **Style Hierarchy**
1. **Base Styles** (`src/styles/global.css`)
   - CSS variables (colors, fonts)
   - Theme configuration
   - Font face declarations
   - Base element resets

2. **Typography Styles** (`src/styles/typography.css`)
   - `.prose` class for blog content
   - Heading, paragraph, list styling
   - Code and table styling

3. **Component Styles**
   - **UI Components**: React components with CVA variants
   - **Astro Components**: Astro templates with Tailwind classes
   - **Custom Styling**: Via `cn()` utility function

4. **Tailwind Utilities**
   - Responsive design
   - Hover/focus/active states
   - Dark mode (via `dark:` prefix)

### B. **Class Merging Pattern**
Components use the `cn()` utility to safely merge Tailwind classes:
```typescript
className={cn(buttonVariants({ variant, size, className }))}
```
- Prevents class conflicts
- Allows prop overrides
- Type-safe with TypeScript

### C. **Integration Example**
```astro
<!-- Layout imports styles -->
<script>
  import '@/styles/global.css'
  import '@/styles/typography.css'
</script>

<!-- Components use classes -->
<div class="bg-background text-foreground">
  <!-- UI components with variants -->
  <Button variant="primary">Click me</Button>
  
  <!-- Astro components with Tailwind -->
  <BlogCard entry={post} />
</div>
```

---

## 8. Customization Guide

### A. **Change Color Scheme**
Edit `/src/styles/global.css`:
```css
:root {
  --primary: oklch(0.205 0 0);              /* Change this */
  --primary-foreground: oklch(0.985 0 0);
  /* ... other colors ... */
}

[data-theme='dark'] {
  --primary: oklch(0.922 0 0);              /* And this */
  --primary-foreground: oklch(0.205 0 0);
  /* ... other colors ... */
}
```

### B. **Change Fonts**
Edit font-family in `src/styles/global.css`:
```css
@theme inline {
  --font-sans: 'Your Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;
}
```
And update @font-face declarations

### C. **Add New Color Tokens**
1. Add CSS variable in `:root` and `[data-theme='dark']`
2. Add to Tailwind theme in `@theme inline` block
3. Use with Tailwind: `text-your-color`

### D. **Create New Component Variants**
Use CVA pattern in UI components:
```typescript
const variants = cva(baseStyles, {
  variants: {
    yourVariant: {
      option1: 'styles...',
      option2: 'styles...',
    }
  }
})
```

### E. **Modify Typography Styles**
Edit `src/styles/typography.css` for `.prose` styling
- Change heading sizes, colors, spacing
- Adjust code block appearance
- Modify table borders and padding

### F. **Configure Theme Colors for Callouts**
Edit `Callout.astro` `calloutConfig` object:
```typescript
const calloutConfig = {
  yourType: {
    style: 'border-your-color dark:bg-your-color-950/5',
    textColor: 'text-your-color-700 dark:text-your-color-300',
    icon: 'lucide:your-icon',
  }
}
```

---

## 9. File Structure Summary

```
src/
├── styles/
│   ├── global.css              # CSS variables, fonts, theme setup
│   └── typography.css          # Blog content (.prose) styling
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Button component (CVA)
│   │   ├── badge.tsx           # Badge component
│   │   ├── avatar.tsx          # Avatar component
│   │   ├── pagination.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── scroll-area.tsx
│   │   └── separator.tsx
│   ├── Header.astro            # Navigation header
│   ├── Footer.astro            # Footer
│   ├── BlogCard.astro          # Blog post card
│   ├── Callout.astro           # Content callouts
│   ├── ThemeToggle.astro       # Light/dark toggle
│   └── ... (other Astro components)
├── lib/
│   ├── utils.ts                # cn() class merging utility
│   └── data-utils.ts
└── layouts/
    └── Layout.astro            # Main layout (imports styles)

Root Config Files:
├── astro.config.ts             # Astro + Tailwind + integrations
├── components.json             # shadcn/ui configuration
├── tsconfig.json               # TypeScript paths
└── package.json                # Dependencies

Public Assets:
└── public/
    ├── fonts/
    │   ├── GeistVF.woff2       # Sans-serif font
    │   └── GeistMonoVF.woff2   # Monospace font
    └── static/
```

---

## 10. Key Takeaways

1. **Tailwind CSS v4** with inline theme configuration (no separate config file)
2. **CSS Variables** for all theming (colors, fonts) - highly customizable
3. **shadcn/ui + Radix UI** for accessible, unstyled components
4. **CVA** for type-safe component variants
5. **Data-attribute based dark mode** (`data-theme="light|dark"`) with localStorage persistence
6. **OKLCH color space** for perceptually uniform colors
7. **Custom fonts** (Geist family) loaded from public directory
8. **Markdown-focused typography** with extensive prose styling
9. **Component composition** pattern using `cn()` utility for safe class merging
10. **Zero-config approach** - all configuration in CSS and component files

