# Seedhe CMD

Seedhe CMD is a command-line tool that provides instant access to commonly used development commands and AI-assisted command guidance directly within the terminal. It helps developers reduce context switching by eliminating the need to search documentation or external resources.

<p align="center">
  <img src="./100.gif" alt="Seedhe CMD Demo" width="700"/>
</p>

---

## Overview

Seedhe CMD improves developer productivity by combining curated command cheatsheets with AI-powered assistance. It enables developers to quickly reference commands, understand their usage, and resolve issues without leaving their workflow.

This project was developed before AI-assisted command guidance became widely integrated into modern IDEs and tooling.

---

## Features

**Command Cheatsheets**
Access frequently used commands for:

* Git
* Docker
* Linux
* React
* Next.js
* Node.js

**AI-Assisted Command Guidance**
Provides command suggestions and explanations using the Google Gemini API.

**Terminal-Native Interface**
Fully operates within the command line environment.

**Lightweight and Easy to Install**
Minimal dependencies and simple setup.

---

## Installation

Install globally using npm:

```bash
npm install -g seedhe-cmd
```

---

## API Key Setup (Required for AI Features)

Seedhe CMD uses the Google Gemini API.

### Linux / macOS

```bash
export GOOGLE_GEMINI_API_KEY=YOUR_API_KEY
```

### Windows (PowerShell)

```powershell
setx GOOGLE_GEMINI_API_KEY "YOUR_API_KEY"
```

---

## Usage

Open the interactive menu:

```bash
seedhe
```

Open a cheatsheet directly:

```bash
seedhe git
seedhe docker
seedhe linux
seedhe react
seedhe nextjs
seedhe nodejs
```

Start AI assistance:

```bash
seedhe chat
```

Exit:

```bash
seedhe exit
```

---

## Use Cases

* Quickly referencing commands during development
* Learning command-line tools
* Reducing reliance on browser-based documentation
* Improving terminal-based workflows

---

## Tech Stack

* Node.js
* CLI tooling (Node ecosystem)
* Google Gemini API

---

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

---

## License

MIT License

