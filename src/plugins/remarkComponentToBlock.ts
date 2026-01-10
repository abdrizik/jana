import { visit } from "unist-util-visit";

export function remarkSvelteComponentBlock() {
  return (tree: any) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.children.length !== 1) return;

      const child = node.children[0];
      if (child.type !== "html") return;

      if (!/^<\s*[A-Z]/.test(child.value)) return;

      parent.children[index] = child;
    });
  };
}
