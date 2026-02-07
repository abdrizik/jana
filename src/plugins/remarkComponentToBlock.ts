import { visit } from 'unist-util-visit'

export function remarkComponentToBlock() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index == null || node.children.length !== 1) return
      const child = node.children[0]
      if (child.type === 'html' && /^<[A-Z][\w-]*/.test(child.value)) {
        parent.children[index] = child
      }
    })
  }
}
