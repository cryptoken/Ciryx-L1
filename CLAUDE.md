# Ciryx-L1 Project Instructions

## Overview

Ciryx-L1 is a local AI chat interface that connects to Ollama. The primary UI is `Ciryx-L1.html` — a standalone HTML/JS/CSS file with no build step required. The `ollama-ui/` directory contains a React/Vite scaffold that is not yet actively used.

## Architecture

- **Primary UI**: `Ciryx-L1.html` — vanilla JS, Tailwind CDN, zero dependencies
- **React scaffold**: `ollama-ui/` — React 19 + TypeScript + Vite (template state)
- **Backend**: Ollama REST API at `http://localhost:11434`
- **API endpoints used**: `GET /api/tags` (list models), `POST /api/chat` (send messages)

## Key Files

| File | Role |
|------|------|
| `Ciryx-L1.html` | Main application — all UI, styling, and logic |
| `Gui.tsx` | Early React prototype (unused, kept for reference) |
| `ollama-ui/` | React/Vite project scaffold |
| `ollama-ui/ollama-ui/` | Duplicate nested directory (can be removed) |

## Development

### Running locally
1. Start Ollama: `$env:OLLAMA_ORIGINS="*"; ollama serve`
2. Open `Ciryx-L1.html` in a browser

### Tech stack
- HTML5 / vanilla JavaScript
- Tailwind CSS (CDN)
- Google Fonts (Inter, JetBrains Mono)

## Conventions

- All chat logic lives in a single HTML file for simplicity
- Messages stored in-memory (no persistence yet)
- Dark theme with purple/blue gradient accents (Ciryx brand)
- Error messages auto-dismiss after 5 seconds
- Models auto-refresh every 30 seconds

## Known Issues

- `ollama-ui/ollama-ui/` is a duplicate nested directory
- React app in `ollama-ui/src/App.tsx` is still the Vite template, not connected to Ollama
- No message persistence across page reloads
- No streaming support (uses `stream: false`)
