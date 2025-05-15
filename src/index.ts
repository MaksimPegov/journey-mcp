import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const JOURNEYS_API_URL = "http://localhost:3000/journeys";
const USER_AGENT = "journeys-mcp/1.0";

// Create server instance
const server = new McpServer({
  name: "journey-mcp",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

// Register a tool to get journeys
server.tool(
  "getJourneys",
  "Get journeys from journey API",
  { input: z.object({}) },
  async () => {
    try {
      const response = await fetch(JOURNEYS_API_URL, {
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          },
        ],
      };
    } catch (error) {
      console.error("Error making request to journeys API:", error);
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve journeys from the API: " + error,
          },
        ],
      };
    }
  }
);

// Register a tool to add journeys
server.tool(
  "addJourney",
  "Add a journey to the journey API",
  {
    title: z.string().describe("Title of the journey or basically direction of the travel"),
    distance: z.string().describe("Distance of the journey in km"),
    date: z.string().describe("Date and time of the journey in format YYYY-MM-DDT TIME"),
  },
  async ({ title, distance, date }) => {
    try {
      const response = await fetch(JOURNEYS_API_URL, {
        method: "POST",
        headers: {
          "User-Agent": USER_AGENT,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          distance,
          dataAndTime: date,
        }),
      });

      const data = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          },
        ],
      };
    } catch (error) {
      console.error("Error making request to journeys API:", error);
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve journeys from the API: " + error,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Journeys MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});