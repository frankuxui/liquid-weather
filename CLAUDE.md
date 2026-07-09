@AGENTS.md

## Claude-specific Graphify rule

This project uses Graphify for codebase navigation. A project knowledge graph should exist at:

```bash
graphify-out/graph.json
```

Before doing broad codebase exploration, repository-wide search, or opening many files, use Graphify first.

## Required workflow

For codebase questions, architecture questions, debugging, refactors, dependency tracing, or feature-location work, first run:

```bash
graphify query "<question>" --graph graphify-out/graph.json
```

For relationships between two concepts, files, modules, components, or services, use:

```bash
graphify path "<source>" "<target>" --graph graphify-out/graph.json
```

For focused explanation of one concept, file, component, route, service, or module, use:

```bash
graphify explain "<node>" --graph graphify-out/graph.json
```

Only inspect source files after Graphify narrows the relevant area.

Do not scan the whole repository unless Graphify results are missing, stale, or insufficient.

## Navigation priority

Use this order when trying to understand the project:

1. `graphify query`
2. `graphify path` or `graphify explain`
3. `graphify-out/wiki/index.md`, if it exists
4. `graphify-out/GRAPH_REPORT.md`, only for broad architecture review
5. Direct source-file inspection
6. Repository-wide search, only as a last resort

Prefer scoped Graphify results over raw grep, broad file listing, or reading many files.

## Keeping the graph current

After modifying code, update the graph:

```bash
graphify update . --code-only
```

If the graph is missing, stale, broken, or incomplete, regenerate it:

```bash
graphify . --code-only
```

## Visual inspection

To generate a visual HTML graph:

```bash
graphify export html --graph graphify-out/graph.json > graphify-out/graph.html
```

To generate a collapsible project tree:

```bash
graphify tree
```

The expected visual outputs are:

```bash
graphify-out/graph.html
graphify-out/GRAPH_TREE.html
```

## Token-efficiency rule

Graphify is used to reduce unnecessary context usage. Avoid reading large files, many files, or the entire repository before consulting the graph.

When answering project questions, first identify the smallest relevant set of files, modules, or relationships through Graphify, then inspect only what is necessary.
