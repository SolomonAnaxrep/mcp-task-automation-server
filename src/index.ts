#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

class TaskAutomationServer {
  private server: Server;
  private tasksDir: string;

  constructor() {
    // Get the directory of the compiled file (dist/index.js)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Go up one level to project root, then into tasks folder
    // Use resolve to ensure we get an absolute path
    this.tasksDir = path.resolve(__dirname, "..", "tasks");
    this.server = new Server(
      {
        name: "task-automation-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "list_tasks",
            description: "List all task instructions availble in this server",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          {
            name: "get_task",
            description: "Retrieve the instructions for a task which you should carry out. list_tasks should probably be used first to get the specific name of the task requested.",
            inputSchema: {
              type: "object",
              properties: {
                task_name: {
                  type: "string",
                  description: "The name of the task to retrieve. list_tasks should probably be used to get the specific name of the task requested.",
                },
              },
              required: ["task_name"],
            },
          },
        ] as Tool[],
      };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "list_tasks": {
            // Read the tasks directory
            const entries = await fs.readdir(this.tasksDir, { withFileTypes: true });
            
            // Filter for files only and remove extensions
            const taskNames = entries
              .filter((entry) => entry.isFile())
              .map((entry) => {
                const filename = entry.name;
                const ext = path.extname(filename);
                return filename.slice(0, ext ? -ext.length : filename.length);
              })
              .sort();

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(taskNames, null, 2),
                },
              ],
            };
          }

          case "get_task": {
            const { task_name } = args as { task_name: string };
            
            // Read the tasks directory
            const entries = await fs.readdir(this.tasksDir, { withFileTypes: true });
            
            // Find the file that matches the task_name (ignoring extension)
            const matchingFile = entries.find((entry) => {
              if (!entry.isFile()) return false;
              const filename = entry.name;
              const ext = path.extname(filename);
              const nameWithoutExt = filename.slice(0, ext ? -ext.length : filename.length);
              return nameWithoutExt === task_name;
            });

            if (!matchingFile) {
              throw new Error(`Task "${task_name}" not found`);
            }

            // Read the file content
            const filePath = path.join(this.tasksDir, matchingFile.name);
            const content = await fs.readFile(filePath, "utf-8");

            return {
              content: [
                {
                  type: "text",
                  text: content,
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Task Automation MCP server running on stdio");
  }
}

// Start the server
const server = new TaskAutomationServer();
server.run().catch(console.error);
