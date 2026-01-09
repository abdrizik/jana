import type { PluggableList } from "unified";

/**
 * Configuration options for the jana plugin
 */
export interface JanaOptions {
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
