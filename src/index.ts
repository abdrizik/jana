import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Plugin } from "vite";
import { rehypeEscapeSvelte } from "./plugins/rehypeEscapeSvelte.js";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeShiki, { theme: "github-dark", tabindex: false })
  .use(rehypeEscapeSvelte)
  .use(rehypeStringify, { allowDangerousHtml: true });

export function jana(): Plugin {
  return {
    name: "jana",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const result = await processor.process(code);

      return {
        code: result.toString(),
        map: null,
      };
    },
  };
}
