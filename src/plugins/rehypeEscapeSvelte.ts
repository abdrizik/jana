import { visit } from 'unist-util-visit'

const replacements: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '{': '&#123;',
  '}': '&#125;'
}

export function rehypeEscapeSvelte() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'pre' && node.tagName !== 'code') return

      visit(node, 'text', (textNode: any) => {
        if (/[{}]/.test(textNode.value)) {
          textNode.type = 'raw'
          textNode.value = textNode.value.replace(/[&<>"'{}]/g, (c: string) => replacements[c])
        }
      })
    })
  }
}
