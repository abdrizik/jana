import type { PluggableList } from "unified";

/**
 * Helper function to apply plugins to a unified processor
 */
export function usePlugins(plugins?: PluggableList): PluggableList {
  return plugins ?? [];
}
