# Graph Report - liquid-weather  (2026-07-09)

## Corpus Check
- 98 files · ~83,819 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 477 nodes · 938 edges · 34 communities (24 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f4cd423f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cities-view.tsx
- utils.ts
- glass-card.tsx
- cn
- page.tsx
- What You Must Do When Invoked
- registry.tsx
- devDependencies
- What You Must Do When Invoked
- open-meteo.ts
- dependencies
- types.ts
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- compilerOptions
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 36 edges
2. `GlassCard` - 18 edges
3. `flagEmoji()` - 16 edges
4. `compilerOptions` - 16 edges
5. `cityHref()` - 14 edges
6. `fetchCityWeather()` - 14 edges
7. `useCustomCitiesStore` - 14 edges
8. `formatHour()` - 13 edges
9. `City` - 12 edges
10. `CityWeather` - 12 edges

## Surprising Connections (you probably didn't know these)
- `CitiesPage()` --calls--> `fetchCitySummaries()`  [EXTRACTED]
  app/cities/page.tsx → src/lib/open-meteo.ts
- `CityPage()` --calls--> `fetchCityWeather()`  [EXTRACTED]
  app/city/[slug]/page.tsx → src/lib/open-meteo.ts
- `Select()` --references--> `react`  [EXTRACTED]
  src/components/ui/select.tsx → package.json
- `HourlyForecast()` --references--> `swiper`  [EXTRACTED]
  src/components/city/hourly-forecast.tsx → package.json
- `generateMetadata()` --calls--> `buildCityFromParams()`  [EXTRACTED]
  app/city/[slug]/page.tsx → src/lib/cities.ts

## Import Cycles
- None detected.

## Communities (34 total, 10 thin omitted)

### Community 0 - "cities-view.tsx"
Cohesion: 0.12
Nodes (29): CONDITIONS, EMPTY_CUSTOM_CITIES, EMPTY_FAVORITES, SORT_OPTIONS, SortKey, CityCard(), CompactCityCard(), CityHeader() (+21 more)

### Community 1 - "utils.ts"
Cohesion: 0.12
Nodes (24): AXIS_STYLE, GlassTooltip(), GlassTooltipPayload, GlassTooltipProps, TooltipValue, PrecipitationChart(), TemperatureChart(), WeeklyChart() (+16 more)

### Community 2 - "glass-card.tsx"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 3 - "cn"
Cohesion: 0.11
Nodes (21): VIEWS, ViewSelector(), FavoritesMenu(), LINKS, Navbar(), ThemeSelector(), getViewportHeight(), MobileMenu() (+13 more)

### Community 4 - "page.tsx"
Cohesion: 0.07
Nodes (32): CitiesPage(), metadata, CityPage(), generateMetadata(), SearchParams, metadata, metadata, poppins (+24 more)

### Community 5 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 6 - "registry.tsx"
Cohesion: 0.07
Nodes (30): SlotState, ComparisonAnalytics(), daylight(), Metric, MetricRow(), Section, time(), trimNum() (+22 more)

### Community 7 - "devDependencies"
Cohesion: 0.05
Nodes (37): dependencies, clsx, @floating-ui/react, lucide-react, motion, next, @radix-ui/react-slot, react (+29 more)

### Community 8 - "What You Must Do When Invoked"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "open-meteo.ts"
Cohesion: 0.19
Nodes (19): classifyPhase(), getMoonInfo(), REFERENCE_NEW_MOON, CURRENT_FIELDS, DAILY_FIELDS, fetchAirQuality(), fetchCitySummary(), fetchCityWeather() (+11 more)

### Community 10 - "dependencies"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 11 - "types.ts"
Cohesion: 0.10
Nodes (31): AddLocationPanel(), CoordsTab(), SearchTab(), Tab, TABS, CitySearchModal(), AddCitiesModal(), Props (+23 more)

### Community 15 - "compilerOptions"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 16 - "graphify reference: extra exports and benchmark"
Cohesion: 0.29
Nodes (6): 🧱 Arquitectura, ✨ Características, 📄 Licencia, 🌤️ Liquid Weather, 🚀 Puesta en marcha, 🛠️ Stack

### Community 17 - "graphify reference: extra exports and benchmark"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 18 - "🌤️ Liquid Weather"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 19 - "graphify reference: query, path, explain"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 20 - "graphify reference: query, path, explain"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 21 - "This is NOT the Next.js you know"
Cohesion: 0.25
Nodes (7): Graphify-first project navigation, Keeping the graph current, Navigation priority, Required workflow, This is NOT the Next.js you know, Token-efficiency rule, Visual inspection

### Community 22 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 23 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 24 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 25 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 28 - "CLAUDE.md"
Cohesion: 0.29
Nodes (6): Claude-specific Graphify rule, Keeping the graph current, Navigation priority, Required workflow, Token-efficiency rule, Visual inspection

## Knowledge Gaps
- **211 isolated node(s):** `metadata`, `SearchParams`, `metadata`, `poppins`, `metadata` (+206 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `cities-view.tsx`, `utils.ts`, `page.tsx`, `registry.tsx`, `devDependencies`, `types.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `Select()` connect `devDependencies` to `cities-view.tsx`, `cn`, `types.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `metadata`, `SearchParams`, `metadata` to the rest of the system?**
  _211 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cities-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1173054587688734 - nodes in this community are weakly interconnected._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11733615221987315 - nodes in this community are weakly interconnected._
- **Should `glass-card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._