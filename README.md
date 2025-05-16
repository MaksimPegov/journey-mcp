# Journey-mcp
### This is the MCP server that connects to the Journey Journal API. (https://github.com/MaksimPegov/journey-journal)
### This mcp server was used on the meetup as an example https://www.youtube.com/watch?v=r0_EE8ek7gs

# How to run:
### Requirements:
- Node.js
### Instructions:
1. ```npm i```
2. ```npm run build```
3. Connect to MCP host:
```
{
  "mcpServers": {
    "journey-mcp": {
      "command": "node",
      "args": [
        "[absolute-path]/journey-mcp/build/index.js"
      ]
    }
  }
}
```

  
