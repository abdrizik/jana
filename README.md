# Jana

A Vite plugin that transforms Markdown files into HTML, allowing you to import and use Svelte components directly in your Markdown content. Extensible with remark and rehype plugins.

## Features

- **Import Svelte components inside Markdown files** - Use Svelte components directly in your Markdown content
- Seamless Markdown processing in Vite
- Automatic escaping of Svelte syntax (`{`, `}`) in code blocks
- Full Markdown to HTML conversion
- Extensible with remark and rehype plugins
- Fast and lightweight (no syntax highlighting overhead)
- SvelteKit and Vite compatible

## Installation

```bash
npm install @khotwa/jana
```

## Usage

### Basic Setup

#### 1. Add Jana to Vite Config

Add Jana to your `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from "vite";
import { jana } from "@khotwa/jana";

export default defineConfig({
  plugins: [
    jana(),
    // ... other plugins
  ],
});
```

#### 2. Configure Svelte Extensions

Add `.md` to the extensions in your `svelte.config.js`:

```js
const config = {
  extensions: [".svelte", ".md"],
  // ... rest of your config
};
```

### Using Markdown Files

#### Option 1: Import as a Component

Import Markdown files directly as Svelte components:

```svelte
<script>
  import Post from './Post.md'
</script>

<Post />
```

#### Option 2: Use as SvelteKit Route File

In SvelteKit, you can use Markdown files directly as route pages:

```txt
src/routes/blog/+page.md
```

The Markdown file will be automatically processed and rendered as a Svelte page when accessed via the route.

### Using Svelte Components in Markdown

You can import and use Svelte components directly inside your Markdown files:

```markdown
<script>
  import MyComponent from './MyComponent.svelte'
</script>

# My Blog Post

This is regular markdown content.

<MyComponent />

You can use components anywhere in your markdown!
```

## How It Works

Jana uses the [unified](https://unifiedjs.com/) ecosystem to process Markdown:

1. **Parse**: Converts Markdown to an abstract syntax tree (AST)
2. **Transform**: Converts the AST to HTML
3. **Escape**: Escapes Svelte syntax characters in code blocks (`{`, `}`)
4. **Stringify**: Converts the AST back to HTML string

The plugin automatically processes any file ending with `.md` during Vite's build process.

## Advanced Usage

### Custom Unified Plugins

Jana supports adding custom [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) plugins to extend functionality:

```js
import { defineConfig } from "vite";
import { jana } from "@khotwa/jana";
import remarkGfm from "remark-gfm";
import rehypeShiki from "rehype-shiki";

export default defineConfig({
  plugins: [
    jana({
      plugins: {
        remark: [remarkGfm],
        rehype: [[rehypeShiki, { theme: "github-dark" }]],
      },
    }),
  ],
});
```

**Plugin format:**

- Plugins can be passed as a function: `[remarkGfm]`
- Or as a tuple with options: `[[rehypeSlug, { prefix: "heading-" }]]`

## License

MIT
