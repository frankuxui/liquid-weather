# Graph Report - liquid-weather  (2026-07-10)

## Corpus Check
- 107 files · ~80,433 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 443 nodes · 831 edges · 36 communities (26 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ed5ec1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cities-view.tsx
- utils.ts
- What You Must Do When Invoked
- navbar.tsx
- cities.ts
- What You Must Do When Invoked
- registry.tsx
- dependencies
- compilerOptions
- types.ts
- renderAppIcon
- add-location-panel.tsx
- eslint.config.mjs
- postcss.config.mjs
- continents.ts
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- 🌤️ Liquid Weather
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- This is NOT the Next.js you know
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- CLAUDE.md
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- extraction-spec.md
- extraction-spec.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 31 edges
2. `GlassCard` - 17 edges
3. `compilerOptions` - 16 edges
4. `City` - 12 edges
5. `CityWeather` - 12 edges
6. `What You Must Do When Invoked` - 12 edges
7. `What You Must Do When Invoked` - 12 edges
8. `renderAppIcon()` - 11 edges
9. `cityHref()` - 11 edges
10. `fetchCityWeather()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Select()` --references--> `react`  [EXTRACTED]
  src/components/ui/select.tsx → package.json
- `AppleIcon()` --calls--> `renderAppIcon()`  [EXTRACTED]
  app/apple-icon.tsx → src/lib/app-icon.tsx
- `GET()` --calls--> `renderAppIcon()`  [EXTRACTED]
  app/icon-192/route.tsx → src/lib/app-icon.tsx
- `GET()` --calls--> `renderAppIcon()`  [EXTRACTED]
  app/icon-512-maskable/route.tsx → src/lib/app-icon.tsx
- `GET()` --calls--> `renderAppIcon()`  [EXTRACTED]
  app/icon-512/route.tsx → src/lib/app-icon.tsx

## Import Cycles
- None detected.

## Communities (36 total, 10 thin omitted)

### Community 0 - "cities-view.tsx"
Cohesion: 0.08
Nodes (26): FEATURES, HIGHLIGHTS, AddLocationPanel(), CitiesView(), SortKey, GlassCard, GlassCardProps, HeroPreview() (+18 more)

### Community 1 - "utils.ts"
Cohesion: 0.17
Nodes (18): AXIS_STYLE, GlassTooltip(), GlassTooltipPayload, GlassTooltipProps, TooltipValue, PrecipitationChart(), TemperatureChart(), WeeklyChart() (+10 more)

### Community 2 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 3 - "navbar.tsx"
Cohesion: 0.14
Nodes (10): FavoritesMenu(), ThemeSelector(), MobileMenuProps, Close, CloseProps, Props, MobileMenuStore, useMobileMenuStore (+2 more)

### Community 4 - "cities.ts"
Cohesion: 0.13
Nodes (13): SearchParams, metadata, poppins, sitemap(), Footer(), buildCityFromParams(), CITIES, cityHref() (+5 more)

### Community 5 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 6 - "registry.tsx"
Cohesion: 0.10
Nodes (23): ComparisonAnalytics(), daylight(), Metric, MetricRow(), Section, time(), trimNum(), WidgetDef (+15 more)

### Community 7 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, clsx, @floating-ui/react, lucide-react, motion, next, @radix-ui/react-slot, react (+25 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "types.ts"
Cohesion: 0.14
Nodes (28): CompareView(), Side, SlotState, getCityWeatherForCityAction(), classifyPhase(), getMoonInfo(), REFERENCE_NEW_MOON, CURRENT_FIELDS (+20 more)

### Community 10 - "renderAppIcon"
Cohesion: 0.25
Nodes (8): AppleIcon(), size, GET(), GET(), GET(), Icon(), size, renderAppIcon()

### Community 11 - "add-location-panel.tsx"
Cohesion: 0.13
Nodes (21): SearchTab(), Tab, CityCard(), FlagAvatar(), FlagAvatarProps, DUST, HeartBurst(), SPARKS (+13 more)

### Community 15 - "continents.ts"
Cohesion: 0.18
Nodes (12): AFRICA, ASIA, CENTRAL_AMERICA_CARIBBEAN, CENTRAL_AMERICA_ZONES, continentFromTimezone(), EUROPE, LOOKUP, NORTH_AMERICA (+4 more)

### Community 16 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 17 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 18 - "🌤️ Liquid Weather"
Cohesion: 0.29
Nodes (6): 🧱 Arquitectura, ✨ Características, 📄 Licencia, 🌤️ Liquid Weather, 🚀 Puesta en marcha, 🛠️ Stack

### Community 19 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 20 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 21 - "This is NOT the Next.js you know"
Cohesion: 0.50
Nodes (3): Graphify-first project navigation, Required workflow, This is NOT the Next.js you know

### Community 22 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 23 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 24 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 25 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 26 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 27 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **192 isolated node(s):** `size`, `SearchParams`, `metadata`, `size`, `poppins` (+187 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Select()` connect `cities-view.tsx` to `add-location-panel.tsx`, `dependencies`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `react` connect `dependencies` to `cities-view.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `size`, `SearchParams`, `metadata` to the rest of the system?**
  _192 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cities-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0841813135985199 - nodes in this community are weakly interconnected._
- **Should `What You Must Do When Invoked` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `navbar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Should `cities.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12923076923076923 - nodes in this community are weakly interconnected._