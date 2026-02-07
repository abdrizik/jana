import { join } from "path";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeComponents } from "./plugins/rehypeComponents";
import { rehypeEscapeSvelte } from "./plugins/rehypeEscapeSvelte";
import { remarkCodeMeta } from "./plugins/remarkCodeMeta";
import { remarkComponentToBlock } from "./plugins/remarkComponentToBlock";
import type { ComponentMap, JanaOptions } from "./types/index";
import { scanProseComponents } from "./utils/scanProse";

export function jana(options: JanaOptions = {}) {
  const { plugins = {}, prose = "src/lib/components/prose" } = options;
  let components: ComponentMap = {};

  return {
    name: "jana",
    enforce: "pre" as const,

    configResolved(config: { root: string }) {
      components = {
        ...scanProseComponents(join(config.root, prose), prose),
        ...options.components,
      };
    },

    async transform(code: string, id: string) {
      if (!id.endsWith(".md")) return null;

      const remark = [...(plugins.remark ?? [])];
      const rehype = [...(plugins.rehype ?? [])];

      if (components.pre) remark.push(remarkCodeMeta);
      if (Object.keys(components).length)
        rehype.push([rehypeComponents, components]);

      try {
        const result = await unified()
          .use(remarkParse)
          .use(remarkComponentToBlock)
          .use(remark)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehype)
          .use(rehypeEscapeSvelte)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(code);

        return { code: result.toString(), map: null };
      } catch (e) {
        console.error(`[jana] ${id}:`, e);
        return null;
      }
    },
  };
}
