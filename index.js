#!/usr/bin/env node
import inquirer from "inquirer";
import clipboardy from "clipboardy";
import axios from "axios";
import dotenv from "dotenv";
import chalk from "chalk";
import ora from "ora";

dotenv.config();
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.log(chalk.red("❌ ERROR: Missing Google Gemini API key. Set GOOGLE_GEMINI_API_KEY in your .env file."));
  process.exit(1);
}

// Simple Title
console.log(chalk.cyan("Seedhe CMD"));

// Cheatsheets
const cheatsheets = {
  git: [
    { command: "git init", description: "Initialize a new repository" },
    { command: "git clone <url>", description: "Clone a repository" },
    { command: "git status", description: "Show working directory status" },
    { command: "git add <file>", description: "Add file to staging area" },
    { command: "git commit -m \"message\"", description: "Commit changes" },
    { command: "git push", description: "Push changes to remote repository" },
    { command: "git pull", description: "Pull changes from remote repository" },
    { command: "git branch", description: "List branches" },
    { command: "git checkout <branch>", description: "Switch branches" },
    { command: "git merge <branch>", description: "Merge branches" },
    { command: "git log", description: "Show commit history" },
    { command: "git reset --hard HEAD", description: "Reset to last commit" },
  ],
  docker: [
    { command: "docker ps", description: "List running containers" },
    { command: "docker stop <container_id>", description: "Stop a running container" },
    { command: "docker images", description: "List docker images" },
    { command: "docker run <image>", description: "Run a docker image" },
    { command: "docker build -t <image_name> .", description: "Build a docker image" },
    { command: "docker rm <container_id>", description: "Remove a container" },
    { command: "docker rmi <image_id>", description: "Remove an image" },
    { command: "docker-compose up", description: "Start docker compose" },
    { command: "docker-compose down", description: "Stop docker compose" },
  ],
  linux: [
    { command: "ls -la", description: "List files with details" },
    { command: "cd <directory>", description: "Change directory" },
    { command: "mkdir <directory>", description: "Make directory" },
    { command: "rm <file>", description: "Remove file" },
    { command: "rm -r <directory>", description: "Remove directory recursively" },
    { command: "cp <source> <destination>", description: "Copy file" },
    { command: "mv <source> <destination>", description: "Move file" },
    { command: "grep <pattern> <file>", description: "Search for pattern in file" },
    { command: "chmod +x <file>", description: "Make file executable" },
    { command: "sudo <command>", description: "Run command as sudo" },
    { command: "apt-get install <package>", description: "Install package" },
    { command: "cat <file>", description: "Display file content" },
  ],
  react: [
    { command: "npx create-vite@latest my-react-app --template react", description: "Create a new React app with Vite" },
    { command: "npm run dev", description: "Start React development server" },
    { command: "npm install <package>", description: "Install a package" },
    { command: "npm run build", description: "Build for production" },
    { command: "npm test", description: "Run tests" },
  ],
  nextjs: [
    { command: "npx create-next-app@latest my-next-app", description: "Create a Next.js app" },
    { command: "npm run dev", description: "Start Next.js development server" },
    { command: "npm run build", description: "Build for production" },
    { command: "npm run start", description: "Start production server" },
    { command: "npm install <package>", description: "Install a package" },
  ],
  nodejs: [
    { command: "node index.js", description: "Run a Node.js script" },
    { command: "npm init -y", description: "Initialize a Node.js project" },
    { command: "npm install <package>", description: "Install a package" },
    { command: "npm start", description: "Start the application" },
  ],
};

// Show Cheatsheet
const showCheatsheet = async (topic) => {
  if (!cheatsheets[topic]) {
    console.log(chalk.red(`❌ No cheatsheet found for: ${topic}`));
    return;
  }

  const choices = cheatsheets[topic].map((item) => ({
    name: `${chalk.cyan(item.command)} → ${chalk.gray(item.description)}`,
    value: item.command,
  }));

  const { selectedCommand } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedCommand",
      message: `📜 ${chalk.bold.yellow(topic.toUpperCase())} Cheatsheet - Select a command to copy:`,
      choices,
    },
  ]);

  try {
    clipboardy.writeSync(selectedCommand);
    console.log(chalk.green(`✅ Copied to clipboard: ${selectedCommand}`));
  } catch (error) {
    console.log(chalk.red("❌ Failed to copy to clipboard. Please copy manually: " + selectedCommand));
  }
};

// AI Chat
const getGeminiResponse = async (query) => {
  const spinner = ora(chalk.blue("🤖 AI Thinking...")).start();
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `For the following command request: "${query}". Provide the exact command with a brief explanation. Highlight the command using backticks. Output the command first then the explanation.` }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || chalk.red("❌ No response!");
    spinner.succeed(chalk.green("🤖 AI Answer:"));
    return text;
  } catch (error) {
    spinner.fail(chalk.red("❌ Error: Failed to connect to AI!"));
    console.error("Gemini API Error:", error);
    return chalk.red("❌ Error: Failed to connect to AI!");
  }
};

// AI Chat Mode
const aiChat = async () => {
  console.log(chalk.yellow("💬 AI Chat Mode Enabled! Type 'exit' to quit."));

  while (true) {
    const { question } = await inquirer.prompt([{ type: "input", name: "question", message: chalk.green("> ") }]);
    if (question.toLowerCase() === "exit") break;

    const response = await getGeminiResponse(question);
    console.log(response);

    try {
      const commandMatch = response.match(/`([^`]+)`/);
      if (commandMatch) {
        clipboardy.writeSync(commandMatch[1]);
        console.log(chalk.green(`✅ Command Copied to clipboard: ${commandMatch[1]}`));
      }
    } catch (error) {
      console.log(chalk.red("❌ Failed to copy the command."));
    }
  }
};

// Main Menu
const mainMenu = async () => {
  const choices = Object.keys(cheatsheets).concat([chalk.blue("AI Chat"), chalk.red("Exit")]);
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.yellow("Choose an option:"),
      choices,
    },
  ]);

  if (choice === chalk.blue("AI Chat")) {
    await aiChat();
  } else if (choice === chalk.red("Exit")) {
    process.exit(0);
  } else {
    await showCheatsheet(choice);
  }
  mainMenu();
};

// Handle Subcommands
const handleSubcommands = async () => {
  const args = process.argv.slice(2); // Get command-line arguments

  if (args.length > 0) {
    const subcommand = args[0];

    if (cheatsheets[subcommand]) {
      await showCheatsheet(subcommand);
    } else if (subcommand === "chat") {
      await aiChat();
    } else if (subcommand === "exit") {
      process.exit(0);
    } else {
      console.log(chalk.red(`❌ Unknown operation: ${subcommand}`));
      mainMenu(); // Show menu if operation is invalid
    }
  } else {
    mainMenu(); // Show menu if no operation is provided
  }
};

handleSubcommands();