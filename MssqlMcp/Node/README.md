# MSSQL Database MCP  Server

<div align="center">
  <img src="./src/img/logo.png" alt="MSSQL Database MCP server logo" width="400"/>
</div>

## What is this? 🤔

This is a server that lets your LLMs (like Claude) talk directly to your MSSQL Database data! Think of it as a friendly translator that sits between your AI assistant and your database, making sure they can chat securely and efficiently.

### Quick Example
```text
You: "Show me all customers from New York"
Claude: *queries your MSSQL Database database and gives you the answer in plain English*
```

## How Does It Work? 🛠️

This server leverages the Model Context Protocol (MCP), a versatile framework that acts as a universal translator between AI models and databases. It supports multiple AI assistants including Claude Desktop and VS Code Agent.

### What Can It Do? 📊

- Run MSSQL Database queries by just asking questions in plain English
- Create, read, update, and delete data
- Manage database schema (tables, indexes)
- Secure connection handling
- Real-time data interaction

## Quick Start 🚀

### Prerequisites
- Node.js 14 or higher
- Claude Desktop or VS Code with Agent extension

### Set up project

1. **Install Dependencies**  
   Run the following command in the root folder to install all necessary dependencies:  
   ```bash
   npm install
   ```

2. **Build the Project**  
   Compile the project by running:  
   ```bash
   npm run build
   ```

## Configuration Setup

### Option 1: VS Code Agent Setup

1. **Install VS Code Agent Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Agent" and install the official Agent extension

2. **Create MCP Configuration File**
   - Create a `.vscode/mcp.json` file in your workspace
   - Add the following configuration:

   ```json
   {
     "servers": {
       "mssql-nodejs": {
          "type": "stdio",
          "command": "node",
          "args": ["q:\\Repos\\SQL-AI-samples\\MssqlMcp\\Node\\dist\\index.js"],
          "env": {
            "SERVER_NAME": "your-server-name.database.windows.net",
            "DATABASE_NAME": "your-database-name",
            "READONLY": "false"
          }
        }
      }
   }
   ```

3. **Alternative: User Settings Configuration**
   - Open VS Code Settings (Ctrl+,)
   - Search for "mcp"
   - Click "Edit in settings.json"
   - Add the following configuration:

  ```json
   {
    "mcp": {
        "servers": {
            "mssql": {
                "command": "node",
                "args": ["C:/path/to/your/Node/dist/index.js"],
                "env": {
                "SERVER_NAME": "your-server-name.database.windows.net",
                "DATABASE_NAME": "your-database-name",
                "READONLY": "false"
                }
            }
        }
    }
  }
  ```

4. **Restart VS Code**
   - Close and reopen VS Code for the changes to take effect

5. **Verify MCP Server**
   - Open Command Palette (Ctrl+Shift+P)
   - Run "MCP: List Servers" to verify your server is configured
   - You should see "mssql" in the list of available servers

### Option 2: Claude Desktop Setup

1. **Open Claude Desktop Settings**
   - Navigate to File → Settings → Developer → Edit Config
   - Open the `claude_desktop_config` file

2. **Add MCP Server Configuration**
   Replace the content with the configuration below, updating the path and credentials:

   ```json
   {
     "mcpServers": {
       "mssql": {
         "command": "node",
         "args": ["C:/path/to/your/Node/dist/index.js"],
         "env": {
           "SERVER_NAME": "your-server-name.database.windows.net",
           "DATABASE_NAME": "your-database-name",
           "READONLY": "false"
         }
       }
     }
   }
   ```

3. **Restart Claude Desktop**
   - Close and reopen Claude Desktop for the changes to take effect

### Configuration Parameters

- **SERVER_NAME**: Your MSSQL Database server name (e.g., `my-server.database.windows.net`)
- **DATABASE_NAME**: Your database name
- **READONLY**: Set to `"true"` to restrict to read-only operations, `"false"` for full access
- **Path**: Update the path in `args` to point to your actual project location.
- **CONNECTION_TIMEOUT**: (Optional) Connection timeout in seconds. Defaults to `30` if not set.
- **TRUST_SERVER_CERTIFICATE**: (Optional) Set to `"true"` to trust self-signed server certificates (useful for development or when connecting to servers with self-signed certs). Defaults to `"false"`.
- **AUTH_TYPE**: (Optional) Authentication method. Options: `"azure"`, `"windows"`, `"sql"`. Defaults to `"azure"`.

### Authentication Options

The server supports three authentication methods:

#### 1. Azure Active Directory (Default)
Uses Azure AD authentication with interactive browser login.
```json
"env": {
  "AUTH_TYPE": "azure",
  "SERVER_NAME": "your-server.database.windows.net",
  "DATABASE_NAME": "your-database"
}
```

#### 2. Windows Authentication
Uses your current Windows credentials (Integrated Security).

**For local SQL Server instances:**
```json
"env": {
  "AUTH_TYPE": "windows",
  "SERVER_NAME": "localhost",
  "DATABASE_NAME": "your-database"
}
```

**For SQL Server Express:**
```json
"env": {
  "AUTH_TYPE": "windows",
  "SERVER_NAME": ".\\SQLEXPRESS",
  "DATABASE_NAME": "your-database"
}
```

**For remote servers or specific Windows credentials:**
```json
"env": {
  "AUTH_TYPE": "windows",
  "SERVER_NAME": "your-server-name",
  "DATABASE_NAME": "your-database",
  "WINDOWS_DOMAIN": "your-domain",
  "WINDOWS_USERNAME": "your-windows-username",
  "WINDOWS_PASSWORD": "your-windows-password"
}
```

Optional parameters for Windows auth:
- **WINDOWS_DOMAIN**: Windows domain (optional, uses current domain if not specified)
- **WINDOWS_USERNAME**: Windows username (optional, uses current user if not specified)  
- **WINDOWS_PASSWORD**: Windows password (optional, uses current user credentials if not specified)

**Troubleshooting Windows Authentication:**
- Ensure SQL Server is configured to allow Windows authentication (not just SQL Server authentication)
- Your Windows user account must have login permissions in SQL Server
- For "untrusted domain" errors, try using specific credentials with WINDOWS_USERNAME/PASSWORD
- For local development, use `localhost` or `.\\SQLEXPRESS` as SERVER_NAME
- Check SQL Server Configuration Manager to ensure the SQL Server service is running

#### 3. SQL Server Authentication
Uses SQL Server username and password.
```json
"env": {
  "AUTH_TYPE": "sql",
  "SERVER_NAME": "your-server-name",
  "DATABASE_NAME": "your-database",
  "SQL_USERNAME": "your-sql-username",
  "SQL_PASSWORD": "your-sql-password"
}
```

Required parameters for SQL auth:
- **SQL_USERNAME**: SQL Server username
- **SQL_PASSWORD**: SQL Server password

## Sample Configurations

You can find sample configuration files in the `src/samples/` folder:
- `claude_desktop_config.json` - For Claude Desktop
- `vscode_agent_config.json` - For VS Code Agent

### Complete Configuration Examples

#### Windows Authentication Example (Local SQL Server Express)
```json
{
  "mcpServers": {
    "mssql": {
      "command": "node",
      "args": ["C:/path/to/your/Node/dist/index.js"],
      "env": {
        "AUTH_TYPE": "windows",
        "SERVER_NAME": ".\\SQLEXPRESS",
        "DATABASE_NAME": "MyDatabase",
        "READONLY": "false",
        "TRUST_SERVER_CERTIFICATE": "true"
      }
    }
  }
}
```

#### Windows Authentication with Specific Credentials
```json
{
  "mcpServers": {
    "mssql": {
      "command": "node",
      "args": ["C:/path/to/your/Node/dist/index.js"],
      "env": {
        "AUTH_TYPE": "windows",
        "SERVER_NAME": "your-server-name",
        "DATABASE_NAME": "MyDatabase",
        "WINDOWS_DOMAIN": "YOURDOMAIN",
        "WINDOWS_USERNAME": "yourusername",
        "WINDOWS_PASSWORD": "yourpassword",
        "READONLY": "false"
      }
    }
  }
}
```

#### SQL Server Authentication Example
```json
{
  "mcpServers": {
    "mssql": {
      "command": "node",
      "args": ["C:/path/to/your/Node/dist/index.js"],
      "env": {
        "AUTH_TYPE": "sql",
        "SERVER_NAME": "localhost",
        "DATABASE_NAME": "MyDatabase",
        "SQL_USERNAME": "myuser",
        "SQL_PASSWORD": "mypassword",
        "READONLY": "false"
      }
    }
  }
}
```

#### Azure AD Authentication Example (Default)
```json
{
  "mcpServers": {
    "mssql": {
      "command": "node",
      "args": ["C:/path/to/your/Node/dist/index.js"],
      "env": {
        "AUTH_TYPE": "azure",
        "SERVER_NAME": "your-server.database.windows.net",
        "DATABASE_NAME": "your-database",
        "READONLY": "false"
      }
    }
  }
}
```

## Usage Examples

Once configured, you can interact with your database using natural language:

- "Show me all users from New York"
- "Create a new table called products with columns for id, name, and price"
- "Update all pending orders to completed status"
- "List all tables in the database"

## Security Notes

- The server requires a WHERE clause for read operations to prevent accidental full table scans
- Update operations require explicit WHERE clauses for security
- Set `READONLY: "true"` in production environments if you only need read access

You should now have successfully configured the MCP server for MSSQL Database with your preferred AI assistant. This setup allows you to seamlessly interact with MSSQL Database through natural language queries!
