# MCP Task Automation Server

A Model Context Protocol (MCP) server built with TypeScript that provides task automation tools accessible by Cursor AI.

## Features

This MCP server provides the following tools:

- **execute_command**: Execute shell commands on the local system
- **read_file**: Read the contents of files
- **write_file**: Write content to files
- **list_directory**: List files and directories in a given path

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

### Running the Server

The server communicates via stdio (standard input/output), which is the standard way MCP servers interact with clients like Cursor.

To run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Configuring Cursor

To use this MCP server with Cursor, you need to add it to your Cursor configuration. The exact location depends on your system:

**macOS/Linux**: `~/.cursor/mcp.json` or `~/.config/cursor/mcp.json`
**Windows**: `%APPDATA%\Cursor\mcp.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "task-automation": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-task-automation-server/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/mcp-task-automation-server` with the actual absolute path to this repository.

Alternatively, if you've installed it globally or have it in your PATH:
```json
{
  "mcpServers": {
    "task-automation": {
      "command": "mcp-task-automation-server"
    }
  }
}
```

After adding the configuration, restart Cursor for the changes to take effect.

## Development

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled server
- `npm run dev` - Run the server with tsx (for development)
- `npm run watch` - Watch for changes and rebuild

## Project Structure

```
.
├── src/
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Extending the Server

To add new tools, modify the `setupToolHandlers` method in `src/index.ts`:

1. Add a new tool definition to the `ListToolsRequestSchema` handler
2. Add a corresponding case in the `CallToolRequestSchema` handler

## License

MIT
