# @moonstar-x/eslint-config

This repo contains a custom ESLint config used by moonstar-x.

## Usage

This config is meant for **ESLint version 8**, make sure to install it in your project as well with:

```bash
npm install eslint@8
```

This config exposes multiple configs depending on the type of the project you're using.

### Node

For Node.js projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["@moonstar-x/eslint-config/rules/node"]
}
```

### Node (TypeScript)

For Node.js with TypeScript projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["@moonstar-x/eslint-config/rules/node", "@moonstar-x/eslint-config/rules/typescript"]
}
```

### React

For React projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["@moonstar-x/eslint-config/rules/react"]
}
```

### React (TypeScript)

For React with TypeScript projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["@moonstar-x/eslint-config/rules/react/typescript"]
}
```

## Rule Overriding

In addition to including this config and its derivatives, you can override rules by adding the following to your `eslint` config:

```json
{
  "extends": [
    "@moonstar-x/eslint-config/rules/type"
  ],
  "rules": {
    "eslint-rule-name": ["enabled", "options"]
    ...
  }
}
```