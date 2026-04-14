# 🤖 Amkyaw AI

<p align="center">
  <a href="https://ai-app-swart-zeta.vercel.app">
    <img src="https://img.shields.io/badge/Live Demo-Vercel-00f2ff?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
  <a href="https://github.com/amkyawdev/ai-app">
    <img src="https://img.shields.io/badge/GitHub-amkyawdev-8b5cf6?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <a href="https://twitter.com/amkyawdev">
    <img src="https://img.shields.io/badge/Twitter-@amkyawdev-00f2ff?style=for-the-badge&logo=twitter" alt="Twitter">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Framer_Motion-FF6B6B?style=for-the-badge" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Groq_SDK-00f2ff?style=for-the-badge" alt="Groq SDK">
</p>

> 🚀 High-performance AI Assistant with Real-Time Token Streaming & Glassmorphism UI

Amkyaw AI is a cutting-edge AI chat application built with Next.js 14, featuring real-time token streaming, elegant glassmorphism design, and powered by Groq's lightning-fast LLM models.

---

## ✨ Features

- **⚡ Real-Time Token Streaming** - Experience instant responses as they're generated token-by-token
- **🧠 Smart Context Memory** - AI remembers your conversation (last 15 messages)
- **🎨 Glassmorphism UI** - Stunning ultra-dark aesthetic with glass effects
- **📱 Responsive Design** - Mobile-first with smooth Framer Motion animations
- **📝 Markdown Support** - Beautiful rendering with syntax highlighting for code
- **🔒 Privacy First** - Conversations stay local in your browser
- **📚 Documentation** - Built-in docs with scroll-spy navigation
- **🎯 RAG-Ready** - Vector store placeholder for knowledge base integration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | App Router, Server Components |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Groq SDK](https://groq.com/) | AI Model Integration |
| [Vercel AI SDK](https://sdk.vercel.ai/) | Streaming Utilities |
| [Three.js](https://threejs.org/) | Particle Background |
| [Lucide React](https://lucide.dev/) | Icons |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/ai-app.git

# Navigate to project directory
cd ai-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

---

## 📁 Project Structure

```
ai-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API with streaming
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── chat/
│   │   └── page.tsx              # Chat interface
│   ├── docs/
│   │   └── page.tsx              # Documentation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ChatInterface.tsx         # Chat component
│   ├── GlassCard.tsx            # Glassmorphism card
│   ├── MessageBubble.tsx        # Message with markdown
│   ├── Navbar.tsx               # Navigation
│   └── ParticlesBackground.tsx  # Three.js particles
├── lib/
│   └── vector-store.ts           # RAG placeholder
├── public/
│   └── favicon.ico               # Site icon
└── package.json
```

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Main background |
| Neon Cyan | `#00f2ff` | Primary accent, buttons |
| Electric Violet | `#8b5cf6` | Secondary accent, gradients |
| Glass | `rgba(255,255,255,0.05)` | Card backgrounds |

### Typography

- **Headings**: Outfit (Google Font)
- **Body**: DM Sans (Google Font)  
- **Code**: JetBrains Mono (Google Font)

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Hero with Three.js particles, features showcase |
| `/chat` | AI chat with streaming, sidebar history |
| `/docs` | Documentation with nested navigation |
| `/about` | Team, vision, and technology stack |

---

## 🔧 API Reference

### Chat Endpoint

**POST** `/api/chat`

Request:
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

Response: Streamed text tokens

---

## 📄 License

MIT License - Feel free to use this project for any purpose.

---

## 🙏 Acknowledgments

- [Groq](https://groq.com/) - For lightning-fast AI inference
- [Vercel](https://vercel.com/) - For amazing deployment platform
- [Next.js Team](https://nextjs.org/) - For incredible framework

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/amkyawdev">Amkyaw Dev</a>
</p>