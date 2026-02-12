# Ciryx-L1 — Product Requirements Document

## 1. Product Overview

**Product**: Ciryx-L1
**Type**: Local AI chat interface
**Owner**: Ciryx AI
**Status**: MVP / Early prototype

Ciryx-L1 is a browser-based chat interface for interacting with large language models running locally via Ollama. It prioritizes privacy (all processing on-device), simplicity (single-file deployment), and a polished user experience.

## 2. Problem Statement

Cloud-based AI chat services (ChatGPT, Claude, etc.) require internet access, incur usage costs, and send user data to external servers. Users who want to run LLMs locally through Ollama are limited to the command-line interface, which lacks conversation management, formatting, and a usable UX.

**Ciryx-L1 solves this** by providing a clean, modern web UI that connects to a local Ollama instance with zero configuration and no data leaving the user's machine.

## 3. Target Users

| Persona | Description |
|---------|-------------|
| **Privacy-conscious developer** | Wants AI assistance without sending proprietary code to cloud APIs |
| **Offline user** | Needs AI capabilities without internet (after initial model download) |
| **AI hobbyist** | Experiments with different local models, wants easy model switching |
| **Cost-sensitive user** | Avoids per-token API pricing by running models locally |

## 4. Current State Analysis

### 4.1 What Exists

**Functional UI** (`Ciryx-L1.html` — 493 lines):
- Single-page chat interface with message history
- Dynamic model discovery via Ollama `/api/tags` endpoint
- Model selector dropdown with size information
- Send/receive messages via Ollama `/api/chat` endpoint
- Code block and inline code formatting in responses
- Connection status indicator (connected/disconnected/no models)
- Error handling with auto-dismissing notifications
- Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Auto-resizing textarea input
- Clear chat functionality
- Auto-refresh models every 30 seconds

**UI/UX Design**:
- Dark theme with CSS custom properties
- Purple-to-blue gradient accents (brand identity)
- Glass-morphism header and input area
- Slide-up message animations
- Animated "thinking" indicator with staggered dots
- Custom scrollbars
- Google Fonts (Inter for UI, JetBrains Mono for code)
- Responsive layout (max-width 5xl container)

**React Scaffold** (`ollama-ui/`):
- React 19 + TypeScript + Vite project initialized
- Tailwind CSS configured
- ESLint configured
- Not connected to Ollama (still template state)

**Early Prototype** (`Gui.tsx`):
- Basic React component with Ollama integration
- Minimal styling, hardcoded model name
- Superseded by `Ciryx-L1.html`

### 4.2 Technical Debt

| Issue | Severity | Notes |
|-------|----------|-------|
| Duplicate `ollama-ui/ollama-ui/` directory | Low | Accidental nesting, should be removed |
| React app disconnected from actual UI | Medium | Scaffold exists but all work is in the HTML file |
| No `.gitignore` at root | Low | `node_modules/` tracked or at risk |
| `New Text Document.txt` in root | Low | Empty file, should be removed |
| `tailwind.config.js` at root unused | Low | Only relevant inside `ollama-ui/` |
| Console.log statements in production code | Low | Debug logging left in |

### 4.3 Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Single HTML file | Zero build step, instant deployment, easy sharing |
| Tailwind via CDN | No build tooling needed for the standalone file |
| No streaming | Simpler implementation; full response rendered at once |
| In-memory messages | No persistence layer needed for MVP |
| Vanilla JS over React | Faster iteration, no framework overhead for a single-page app |

## 5. Feature Requirements

### 5.1 Phase 1 — MVP (Current)

| # | Feature | Status |
|---|---------|--------|
| F1 | Chat with local Ollama models | Done |
| F2 | Model discovery and selection | Done |
| F3 | Code block formatting | Done |
| F4 | Connection status indicator | Done |
| F5 | Error handling with user guidance | Done |
| F6 | Keyboard shortcuts | Done |
| F7 | Clear chat | Done |
| F8 | Dark theme | Done |

### 5.2 Phase 2 — Core Improvements

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| F9 | Streaming responses | High | Display tokens as they arrive instead of waiting for full response |
| F10 | Chat persistence | High | Save conversations to localStorage or IndexedDB |
| F11 | Conversation management | Medium | Create, rename, delete, and switch between conversations |
| F12 | Model parameters | Medium | UI controls for temperature, top_p, system prompt |
| F13 | Markdown rendering | Medium | Full markdown support (headers, lists, tables, links) |
| F14 | Copy code blocks | Medium | One-click copy button on code blocks |

### 5.3 Phase 3 — Enhanced UX

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| F15 | Export/import chats | Low | Export conversations as JSON or Markdown |
| F16 | System prompts | Medium | Configurable system prompt per conversation |
| F17 | Search conversations | Low | Full-text search across saved chats |
| F18 | Light/dark theme toggle | Low | User-selectable theme |
| F19 | Mobile optimization | Medium | Touch-friendly layout, responsive design refinements |
| F20 | Image support | Low | Send/receive images (for multimodal models) |

### 5.4 Phase 4 — Platform Migration

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| F21 | React migration | Medium | Move active code to React/Vite for component architecture |
| F22 | Desktop app (Electron/Tauri) | Low | Package as a native desktop application |
| F23 | Multi-user support | Low | Optional auth layer for shared deployments |

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **First load** | < 2 seconds on localhost |
| **Message send-to-display** | Determined by Ollama model speed |
| **Browser support** | Chrome, Edge, Firefox, Safari (latest 2 versions) |
| **Accessibility** | Keyboard navigable, screen reader compatible labels |
| **Offline capability** | Works without internet once page is cached (CDN fonts/CSS cached) |
| **Security** | No external data transmission; XSS prevention via HTML escaping |

## 7. API Contract

### Ollama API (External Dependency)

**Base URL**: `http://localhost:11434`

#### List Models
```
GET /api/tags
Response: { models: [{ name: string, size: number, ... }] }
```

#### Chat Completion
```
POST /api/chat
Body: {
  model: string,
  messages: [{ role: "user"|"assistant"|"system", content: string }],
  stream: boolean
}
Response: {
  message: { role: "assistant", content: string },
  done: boolean
}
```

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| GitHub stars | Community interest indicator |
| Issues/PRs | Active contribution signal |
| User-reported bugs | < 5 open at any time |
| Model compatibility | Works with all Ollama-supported models |
| Load time | < 2s first paint |

## 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ollama API changes | Breaks chat functionality | Pin to known working API version, monitor Ollama releases |
| Large model responses | UI freezes on very long outputs | Implement streaming (F9), add response length limits |
| No persistence | Users lose chats on page reload | Implement localStorage persistence (F10) |
| CDN dependency | Tailwind/fonts fail without internet | Bundle Tailwind CSS locally or self-host fonts |
| Single-file scaling | HTML file becomes unmanageable as features grow | Migrate to React component architecture (F21) |

## 10. Open Questions

1. Should the React migration (Phase 4) happen before or after streaming support?
2. Is Electron or Tauri the better choice for a desktop wrapper?
3. Should chat persistence use localStorage (simple) or IndexedDB (scalable)?
4. Is there a need for a backend proxy to support remote Ollama instances?
