# Amkyaw AI - Full-Stack Web Application Specification

## 1. Project Overview

- **Project Name:** Amkyaw AI
- **Type:** Full-Stack AI Chat Web Application
- **Core Functionality:** High-performance AI assistant with real-time token streaming, chat memory, and glassmorphism UI
- **Target Users:** General users seeking AI assistance with modern, immersive chat experience

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **AI SDK:** Groq SDK + Vercel AI SDK (ai)
- **Icons:** Lucide React
- **Markdown:** react-markdown + react-syntax-highlighter

## 3. UI/UX Specification

### 3.1 Color Palette
- **Background:** Deep Charcoal #0a0a0a to Black
- **Glass Effect:** bg-white/5, backdrop-blur-xl, border-white/10
- **Accent Primary (Neon Cyan):** #00f2ff
- **Accent Secondary (Electric Violet):** #8b5cf6
- **Text Primary:** #ffffff
- **Text Secondary:** #a1a1aa

### 3.2 Typography
- **Headings:** "Outfit" (Google Font) - Bold, Modern
- **Body:** "DM Sans" (Google Font) - Clean, Readable
- **Code:** "JetBrains Mono" - Monospace

### 3.3 Layout Structure
- **Navbar:** Slim, translucent glass navbar on desktop; Hamburger menu on mobile
- **Sidebar:** Left-aligned, collapsible for chat history
- **Content Areas:** Glass cards with backdrop-blur

### 3.4 Components
- **Buttons:** Neon cyan glow effect on hover
- **Input Fields:** Glass-textured, subtle border
- **Cards:** Glassmorphism with white/5 bg, backdrop-blur-xl
- **Code Blocks:** Syntax highlighting with dark theme

## 4. Page Specifications

### 4.1 Index Page (/)
- Hero section with Three.js floating particles background
- "Get Started" button with glow effect
- Animated tagline with staggered entrance

### 4.2 Chat Page (/chat)
- Left collapsible sidebar for chat history
- Markdown support with syntax highlighting
- Real-time token streaming display
- Auto-scroll to bottom on new messages
- Glass-textured input bar with file-upload icon

### 4.3 Docs Page (/docs)
- Nested side navigation
- Documentation-first layout
- Smooth scroll-spy

### 4.4 About Page (/about)
- Grid-based layout
- Hover-scale effects on cards

## 5. Backend Specification

### 5.1 API Route (/api/chat)
- Groq SDK integration with llama-4-scout-17b model
- Token streaming using ReadableStream
- System prompt for context management
- Last 10-15 messages for conversation continuity

### 5.2 Environment Variables
- GROQ_API_KEY (required)

## 6. Animation Specifications

- **Page Transitions:** AnimatePresence
- **Component Morphing:** layoutId
- **Mobile Menu:** Framer Motion spring animations
- **Particles:** Three.js with floating animation
- **Hover Effects:** Scale, glow, color transitions

## 7. File Structure

```
/app
  /api/chat/route.ts
  /chat/page.tsx
  /docs/page.tsx
  /about/page.tsx
  /page.tsx (Index)
  /layout.tsx
  /globals.css
/components
  /Navbar.tsx
  /Sidebar.tsx
  /ChatInterface.tsx
  /MessageBubble.tsx
  /ParticlesBackground.tsx
  /GlassCard.tsx
/lib
  /groq-client.ts
  /vector-store.ts (placeholder)
```

## 8. Acceptance Criteria

1. ✅ Index page loads with Three.js particles background
2. ✅ Chat page streams tokens in real-time
3. ✅ Sidebar collapses/expands with smooth animation
4. ✅ Markdown renders with syntax highlighting
5. ✅ Mobile hamburger menu works with spring animation
6. ✅ Glassmorphism effect visible on all cards
7. ✅ Neon cyan accent on buttons with glow
8. ✅ API route streams from Groq correctly
9. ✅ Chat memory maintains last 10-15 messages
10. ✅ Docs page has nested navigation with scroll-spy