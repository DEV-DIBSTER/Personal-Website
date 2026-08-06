import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Off until OpenNext handles Next 16.3's prefetchInlining object.
  // With interception on, segment prefetches always get full RSC and Links loop.
  enableCacheInterception: false,
});
