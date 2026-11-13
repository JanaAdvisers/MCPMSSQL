import sql from "mssql";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export class DescribeTableTool implements Tool {
  [key: string]: any;
  name = "describe_table";
  description =
    "Describes the schema (columns and types) of a specified MSSQL Database table. Uses the INFORMATION_SCHEMA.COLUMNS table.";
  inputSchema = {
    type: "object",
    properties: {
      tableName: {
        type: "string",
        description: "Name of the table to describe",
      },
      schemaName: { type: "string", description: "The schema the table is in" },
    },
    required: ["tableName"],
  } as any;

  async run(params: { tableName: string; schemaName: string }) {
    try {
      const { tableName, schemaName } = params;
      const request = new sql.Request();
      const query = `SELECT COLUMN_NAME as name, DATA_TYPE as type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName AND TABLE_SCHEMA = @schemaName`;
      request.input("tableName", sql.NVarChar, tableName);
      request.input("schemaName", sql.NVarChar, schemaName);
      const result = await request.query(query);
      return {
        success: true,
        columns: result.recordset,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to describe table: ${error}`,
      };
    }
  }
}
