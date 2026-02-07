import { visit } from "unist-util-visit";

export function parseMeta(meta: string) {
  const result: Record<string, string | boolean> = {};

  const parts = meta.match(/\w+(?:\s*=\s*(?:"[^"]*"|[^\s]+))?/g) ?? [];

  for (const part of parts) {
    const eq = part.indexOf("=");

    if (eq === -1) {
      result[part.trim()] = true;
    } else {
      const key = part.slice(0, eq).trim();
      const raw = part.slice(eq + 1).trim();
      result[key] = raw.replace(/^"|"$/g, "");
    }
  }

  return result;
}

export function remarkCodeMeta() {
  return (tree: any, file: any) => {
    file.data ??= {};
    file.data.codeMeta = [];

    visit(tree, "code", (node: any) => {
      file.data.codeMeta.push(node.meta ? parseMeta(node.meta) : null);
    });
  };
}
