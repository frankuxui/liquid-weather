import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts"
  ]),

  {
    rules: {
      // Anonymous exports
      "import/no-anonymous-default-export": "off",

      // TypeScript
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      "@typescript-eslint/no-explicit-any": "off",

      // React / Next
      "react/react-in-jsx-scope": "off",

      // CRLF and LF
      "linebreak-style": ["error", "unix"],

      // React compiler checks require behavioral refactors; keep this pass config-only.
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",

      // Next.js
      "@next/next/no-img-element": "off"
    }
  }
]);

export default eslintConfig;
