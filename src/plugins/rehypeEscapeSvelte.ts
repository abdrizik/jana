import { visit } from 'unist-util-visit'

const ESC: Record<string, string> = {
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
      visit(node, 'text', (t: any) => {
        if (/[{}]/.test(t.value)) {
          t.type = 'raw'
          t.value = t.value.replace(/[&<>"'{}]/g, (c: string) => ESC[c])
        }
      })
    })
  }
}
