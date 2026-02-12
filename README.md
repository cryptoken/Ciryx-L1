# Ciryx-L1

A local AI assistant interface powered by [Ollama](https://ollama.ai). Chat with language models running entirely on your machine — no cloud, no API keys, no data leaves your computer.

## Features

- **Fully local** — runs against Ollama on `localhost`, zero external API calls
- **Model switching** — auto-detects all installed Ollama models with size info
- **Dark UI** — polished dark theme with glass-morphism and gradient accents
- **Code formatting** — syntax-highlighted code blocks and inline code in responses
- **Keyboard shortcuts** — `Enter` to send, `Shift+Enter` for new line
- **Connection status** — live indicator showing Ollama connectivity and model count
- **Zero build step** — single HTML file, open it and go

## Prerequisites

- [Ollama](https://ollama.ai) installed and running
- At least one model pulled (e.g. `ollama pull llama3.2`)
- A modern browser (Chrome, Edge, Firefox, Safari)

## Quick Start

### 1. Start Ollama with CORS enabled

```powershell
# PowerShell
$env:OLLAMA_ORIGINS="*"; ollama serve
```

```bash
# Linux / macOS
OLLAMA_ORIGINS="*" ollama serve
```

### 2. Pull a model (if you haven't already)

```bash
ollama pull llama3.2
```

### 3. Open the interface

Open `Ciryx-L1.html` in your browser. That's it.

For a local server (optional):

```bash
python -m http.server 8000
# Navigate to http://localhost:8000/Ciryx-L1.html
```

## How It Works

```
Browser (Ciryx-L1.html)
    |
    |  HTTP / REST
    v
Ollama Server (localhost:11434)
    |
    v
Local LLM (Llama, Dolphin, Mistral, etc.)
```

The interface sends chat messages to Ollama's `/api/chat` endpoint and displays formatted responses. Conversation history is maintained in-memory for multi-turn context.

## Project Structure

```
Ciryx-L1/
├── Ciryx-L1.html        # Main application (standalone, no build needed)
├── Gui.tsx               # Early React prototype (reference only)
├── ollama-ui/            # React/Vite scaffold (future development)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── CLAUDE.md             # AI assistant project context
├── PRD.md                # Product requirements document
└── README.md
```

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (CDN), custom CSS animations
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Backend**: [Ollama](https://ollama.ai) REST API

## Supported Models

Any model available through Ollama works with Ciryx-L1. Popular options:

| Model | Pull Command | Size |
|-------|-------------|------|
| Llama 3.2 | `ollama pull llama3.2` | ~2 GB |
| Llama 3.1 8B | `ollama pull llama3.1:8b` | ~4.7 GB |
| Mistral | `ollama pull mistral` | ~4.1 GB |
| Dolphin 3 | `ollama pull dolphin3` | ~2 GB |
| Phi-3 | `ollama pull phi3` | ~2.2 GB |

## Troubleshooting

**"Cannot connect to Ollama"**
- Ensure Ollama is running: `ollama serve`
- Enable CORS: `$env:OLLAMA_ORIGINS="*"; ollama serve`

**"No models installed"**
- Pull a model: `ollama pull llama3.2`
- Click the refresh button in the header

**Slow responses**
- Smaller models (3B parameters) respond faster
- Check available RAM — models load entirely into memory
- GPU acceleration significantly improves speed

## Roadmap

- [ ] Streaming responses (token-by-token display)
- [ ] Chat persistence (localStorage / IndexedDB)
- [ ] Multiple conversation tabs
- [ ] Model parameter controls (temperature, top_p)
- [ ] Export chat history
- [ ] Migrate active UI to React/Vite build

## License

MIT

---

Built by [Ciryx AI](https://github.com/cryptoken)
