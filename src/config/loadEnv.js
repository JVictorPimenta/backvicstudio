import { existsSync } from "node:fs";

const envFilePath = existsSync(".env")
  ? ".env"
  : existsSync("src/.env")
  ? "src/.env"
  : null;

if (envFilePath) {
  process.loadEnvFile?.(envFilePath);
}
