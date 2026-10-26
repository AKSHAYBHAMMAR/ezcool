---
name: Atmospheric Precision
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#aec6ff'
  on-secondary: '#002e6b'
  secondary-container: '#508eff'
  on-secondary-container: '#00275e'
  tertiary: '#5bdeef'
  on-tertiary: '#00363c'
  tertiary-container: '#36c2d2'
  on-tertiary-container: '#004c53'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a43'
  on-secondary-fixed-variant: '#004397'
  tertiary-fixed: '#91f1ff'
  tertiary-fixed-dim: '#54d8e8'
  on-tertiary-fixed: '#001f23'
  on-tertiary-fixed-variant: '#004f57'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '500'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system establishes an ultra-premium, architectural technology aesthetic engineered for luxury thermal comfort, precision environmental engineering, and intelligent climate curation. Rejecting utilitarian HVAC tropes—such as cartoonish temperature gauges, wrench icons, and high-visibility contractor yellow—the system treats indoor air quality, thermal dynamics, and thermodynamic service with the tactile, cinematic restraint of precision Scandinavian automotive engineering and luxury acoustic design.

The aesthetic fuses deep cinematic minimalism with optical glassmorphism. Surfaces feel like dark-tinted structural glass, floating precision dials, and matte anodized titanium interfaces set against deep cosmic blacks. Subtle cyan and electric blue luminous diffusion mimics the movement of purified, chilled airflow across physical hardware. The interface communicates silent performance, surgical precision, and bespoke luxury.

## Colors

The palette is anchored in void blacks and cool atmospheric depths, energized by focused, icy electromagnetic glows:

- **Deep Void & Substrates**: `#07090E` forms the root base layer, with `#0B0F17` establishing the primary elevated canvas. Structural containers leverage dark obsidian `#0F172A` and muted charcoal tones with varying opacities (`rgba(15, 23, 42, 0.65)`).
- **Thermal & Flow Accents**:
  - **Electric Cyan (`#38BDF8`) & Glacial Blue (`#0070F3`)**: Convey clinical airflow calibration, high-performance status, and dynamic active metrics.
  - **Sub-zero Frost (`#67E8F9`) & Ice Mist (`#E0F2FE`)**: Reserved for micro-accents, data needle highlights, precision focal rings, and high-lux status badges.
- **Atmospheric Neutrals & Typography**:
  - Pure Optical White (`#FFFFFF`): For display typography and dominant reading nodes.
  - Muted Aerodynamic Silver (`#94A3B8`): For descriptive body copy, system parameters, and unit values.
  - Structural Ghost Stroke (`rgba(255, 255, 255, 0.08)`): Creates razor-thin borders around glass surfaces.

Gradients must remain optical and atmospheric; sharp linear stops are prohibited. Ambient glows must utilize radial blur falloffs exceeding `60px` to mirror physical light refraction through frosted glass.

## Typography

The typography couples the architectural geometric precision of **Space Grotesk** for display expressions, the neutral clarity of **Inter** for narrative and operational body text, and the industrial telemetry aesthetic of **JetBrains Mono** for hardware diagnostics, particulate counts, and thermodynamic metrics.

All uppercase headers and telemetry labels require expanded letter tracking (`0.06em` to `0.1em`) to mimic instrumentation panels. Body text is locked to tight negative tracking (`-0.01em`) to maintain a dense, high-end editorial rhythm. Headlines avoid pure bold weights; medium weights (`500`) paired with large point sizes create refined, confident authority without visual clutter.

## Layout & Spacing

The layout is built upon an architectural 12-column grid on desktop and a unified 4-column framework on mobile devices, emphasizing vast, curated negative space reminiscent of luxury gallery installations:

- **Desktop (1200px+)**: 12-column structure with `1.5rem` gutters and dynamic outer margins of up to `4rem` (capping at an inner container max-width of `1440px`). Sections breathe with vertical distances between `5rem` and `8rem`.
- **Tablet (768px - 1199px)**: 8-column layout with `1.25rem` gutters and `2.5rem` outer margins.
- **Mobile (< 768px)**: 4-column layout with `1rem` gutters and `1.25rem` outer canvas padding.

Modules align to a baseline vertical 4px grid. Whitespace is treated as a structural luxury material—data metrics, climate readings, and architectural photography must sit within generous margins to maintain visual calm.

## Elevation & Depth

Depth is established strictly through light transmission, translucency, and frosted glass physics rather than standard drop shadows:

1. **Substrate Base (Level 0)**: Pure `#07090E` or `#0B0F17` opaque foundations, occasionally lit from behind by deep, out-of-focus atmospheric radial blurs (`background: radial-gradient(circle at top, rgba(0, 112, 243, 0.12), transparent 70%)`).
2. **Frosted Shrouds (Level 1 - Cards/Surfaces)**: Semi-transparent fills (`rgba(11, 15, 23, 0.72)`) utilizing backdrop filters (`backdrop-filter: blur(24px) saturate(180%)`). Outlines are bounded by ghost borders (`1px solid rgba(255, 255, 255, 0.08)`).
3. **Floating Pods & Modals (Level 2)**: Higher-density translucent surfaces (`rgba(15, 23, 42, 0.85)`) paired with double-layer perimeter definition:
   - Outer glow: `0 20px 50px rgba(0, 0, 0, 0.6)`.
   - Edge reflection: an inner top border accent (`inset 0 1px 0 rgba(255, 255, 255, 0.15)`).
4. **Active Luminescence (State Focus)**: Interactive items acquire an aura of electric cyan light (`box-shadow: 0 0 25px -4px rgba(56, 189, 248, 0.35)`), suggesting energetic thermodynamic activation.

## Shapes

The design system incorporates geometric curves inspired by industrial consumer electronics, precision remote controllers, and architectural duct diffusers:

- Standard structural panels, modular tiles, and cards use an exact radius of `0.75rem` (`12px`), while expanded hero enclosures and full modals use `1rem` to `1.5rem`.
- Sensor status indicators, filter lifespan tags, mode toggles, and primary call-to-actions utilize full pill radii (`9999px`) to create smooth, polished focal points against the rectilinear architectural layout.

## Components

### Buttons
- **Primary Kinetic**: Pill-shaped (`rounded-full`), solid optical white (`#FFFFFF`) background with `#07090E` Space Grotesk text. On hover, transitions to a cyan backlight bloom (`box-shadow: 0 0 30px rgba(56, 189, 248, 0.4)` and a faint text color shift).
- **Secondary Atmospheric**: Pill-shaped, dark frosted glass (`rgba(255, 255, 255, 0.04)`), bounded by `1px solid rgba(255, 255, 255, 0.1)`. Hover triggers surface fill to `rgba(255, 255, 255, 0.08)` with edge illumination.
- **Ghost Diagnostic**: Monospaced text with zero fill, flanked by a precise directional chevron and an animated expanding bottom border.

### Status Pills & Badges
- Encapsulated pills featuring an active pulsing LED dot (e.g., `#38BDF8` with a continuous `ping` animation), displaying metrics such as "HEPA H14 ACTIVE", "PURITY INDEX 99.8%", or "COMPRESSOR NOMINAL".
- Typography is strictly `label-md` in JetBrains Mono.

### Cards & Tile Ecosystem
- Transparent dark glass (`rgba(11, 15, 23, 0.65)`) with `backdrop-filter: blur(20px)`.
- Enclosed with a `1px` stroke using `rgba(255, 255, 255, 0.08)`. Hover states raise the top stroke brightness to `rgba(255, 255, 255, 0.25)` via subtle transitions.
- No heavy divider lines; internal separation is achieved strictly through whitespace and typography shifts.

### Inputs & Controls
- **Text & Service Selectors**: Understated dark capsules (`rgba(255, 255, 255, 0.03)`) with inset borders. Active focus illuminates the container border with `#38BDF8` and applies a `0 0 12px rgba(56, 189, 248, 0.2)` aura.
- **Precision Sliders & Range Selectors**: Thin, 2px frosted tracks featuring a bright glacial blue (`#0070F3` to `#38BDF8`) gradient fill, anchored by a brushed aluminum circular thumb with an icy core indicator.

### Specialized Diagnostics & Climate Telemetry
- **Rotary Thermal Ring**: A circular thermal adjustment ring inspired by luxury automotive climate dials, presenting thin degree increments (`0.5°C` / `1°F` steps) paired with a live radial gradient sweep.
- **Acoustic / Decibel Indicator**: Minimalist horizontal frequency bars displaying ultra-low operating sound levels (e.g., `< 19 dB - Whisper Quiet`).