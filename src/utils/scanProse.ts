import { existsSync, readdirSync } from "fs";
import type { ComponentMap } from "../types/index";

const TAGS: Record<string, string> = {
  A: "a", Blockquote: "blockquote", Code: "code", Em: "em",
  H1: "h1", H2: "h2", H3: "h3", H4: "h4", H5: "h5", H6: "h6",
  Hr: "hr", Img: "img", Li: "li", Ol: "ol", P: "p", Pre: "pre",
  Strong: "strong", Table: "table", Tbody: "tbody", Td: "td",
  Th: "th", Thead: "thead", Tr: "tr", Ul: "ul",
};

export function scanProseComponents(fullPath: string, relativePath: string): ComponentMap {
  if (!existsSync(fullPath)) return {};

  const libPath = relativePath.replace(/^src\/lib\//, "$lib/");
  const components: ComponentMap = {};

  for (const file of readdirSync(fullPath)) {
    if (!file.endsWith(".svelte")) continue;
    const name = file.replace(".svelte", "");
    const tag = TAGS[name];
    if (tag) components[tag] = `${libPath}/${file}`;
  }

  return components;
}
