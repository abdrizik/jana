import { visit } from "unist-util-visit";
import type { ComponentMap } from "../types/index";

export function rehypeComponents(components: ComponentMap) {
  const entries = Object.entries(components);
  const names = entries.map(([, path]) => path.split("/").pop()!.replace(".svelte", ""));

  return (tree: any, file: any) => {
    const codeMeta = file.data?.codeMeta ?? [];

    // Wrap elements
    const tagMap = new Map(entries.map(([tag], i) => [tag, names[i]]));
    let metaIdx = 0;

    visit(tree, "element", (node: any, idx: number | undefined, parent: any) => {
      const name = tagMap.get(node.tagName);
      if (name && parent && idx !== undefined) {
        parent.children[idx] = {
          type: "element",
          tagName: name,
          properties: node.tagName === "pre" ? (codeMeta[metaIdx++] ?? {}) : {},
          children: [node],
        };
      }
    });

    // Inject imports
    const isScript = (n: any) =>
      n.type === "raw" && n.value?.includes("<script") && !n.value.includes("<script module");

    let script = tree.children.find(isScript);
    if (!script) {
      script = { type: "raw", value: "<script>\n</script>" };
      tree.children.unshift(script);
    }

    const imports = entries
      .filter((_, i) => !script.value.includes(`import ${names[i]}`))
      .map(([, path], i) => `  import ${names[i]} from "${path}"`);

    if (imports.length) {
      script.value = script.value.replace("</script>", `${imports.join("\n")}\n</script>`);
    }
  };
}
