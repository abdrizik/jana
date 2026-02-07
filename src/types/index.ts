import type { PluggableList } from "unified";

/**
 * Component mapping - maps HTML elements to Svelte component paths
 */
export type ComponentMap = Record<string, string>;

/**
 * Configuration options for the jana plugin
 */
export interface JanaOptions {
  /**
   * Path to prose components folder (auto-discovers components)
   * @default 'src/lib/components/prose'
   * @example 'src/components/prose'
   */
  prose?: string;
  /**
   * Map HTML elements to custom Svelte components (explicit config)
   * @example { pre: '$lib/components/Code.svelte' }
   */
  components?: ComponentMap;
  /**
   * Custom unified plugins to extend functionality
   */
  plugins?: {
    /**
     * Array of remark plugins to use
     * Can be a plugin function or a tuple [plugin, options]
     */
    remark?: PluggableList;
    /**
     * Array of rehype plugins to use
     * Can be a plugin function or a tuple [plugin, options]
     */
    rehype?: PluggableList;
  };
}
