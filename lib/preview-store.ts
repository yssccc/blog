import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "tmp-preview.json");

async function readStore(): Promise<Record<string, string>> {
  try {
    const json = await fs.readFile(FILE, "utf-8");
    return JSON.parse(json);
  } catch {
    return {}; 
  }
}

export async function savePreview(mdx: string): Promise<string> {
  const id = crypto.randomUUID();
  const store = await readStore();

  store[id] = mdx;

  await fs.writeFile(FILE, JSON.stringify(store, null, 2));

  return id;
}

export async function getPreview(id: string): Promise<string> {
  const store = await readStore();
  return store[id] ?? "";
}
