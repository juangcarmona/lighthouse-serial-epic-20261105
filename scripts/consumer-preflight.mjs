import { access } from "node:fs/promises";
await access(new URL("../package.json", import.meta.url));
