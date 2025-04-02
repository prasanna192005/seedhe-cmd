# Seedhe CMD

Seedhe CMD is a command-line tool designed to streamline your development workflow by providing quick access to common command cheatsheets and AI-powered command assistance.
![Seedhe CMD Demo](./100.gif)
## Features

- **Cheatsheets:** Access essential command-line cheatsheets for Git, Docker, Linux, React, Next.js, and Node.js directly from your terminal.
- **AI Chat:** Get AI-powered command suggestions and explanations using the Google Gemini API.
- **Easy to Use:** Simple and intuitive command-line interface.

## Installation

```bash
npm install -g seedhe-cmd
```

### Google Gemini API Key Setup (for AI Chat)

The AI chat feature requires a Google Gemini API key.

#### Obtain your API key:
1. Go to the Google Cloud Console, enable the Gemini API, and create an API key.

#### Set the environment variable:

##### Linux/macOS:
```bash
export GOOGLE_GEMINI_API_KEY=YOUR_API_KEY
```
(Add this line to your `.bashrc` or `.zshrc` for a permanent setting.)

##### Windows (PowerShell):
```powershell
set GOOGLE_GEMINI_API_KEY=YOUR_API_KEY
```
(Use `setx` for a permanent setting, or configure it via system settings.)

Replace `YOUR_API_KEY` with your actual API key.

⚠️ **Important:** Keep your API key secure and do not share it publicly.

## Usage

### Cheatsheets
To access a cheatsheet, use the following command:

```bash
seedhe <cheatsheet_name>
```

Replace `<cheatsheet_name>` with one of the following:

- `git`
- `docker`
- `linux`
- `react`
- `nextjs`
- `nodejs`

#### Example:
```bash
seedhe git
```

### AI Chat
To start the AI chat mode, use the following command:

```bash
seedhe chat
```

### Main Menu
To open the main menu, run:

```bash
seedhe
```

### Exit
To exit the application, run:

```bash
seedhe exit
```

## Command Guide

- `seedhe` : Opens the main interactive menu.
- `seedhe <cheatsheet_name>` : Directly displays the specified cheatsheet.
- `seedhe chat` : Starts the AI chat mode.
- `seedhe exit` : Exits the application.

## Troubleshooting

- **"❌ ERROR: Missing Google Gemini API key."**: Ensure you have correctly set the `GOOGLE_GEMINI_API_KEY` environment variable.
- **"❌ Error: Failed to connect to AI!"**: Verify your internet connection and that your API key is valid.
- **"❌ Failed to copy the command."**: In some terminal environments, copying to the clipboard might not be supported. Copy the command manually.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License.
