# eslint-config-greencoast

A shareable ESLint config used by Greencoast Studios.

## Usage

This config exposes multiple configs depending on the type of the project you're using.

### Node

For Node.js projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["greencoast/node"]
}
```

### Node (TypeScript)

For Node.js with TypeScript projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["greencoast/node", "greencoast/typescript"]
}
```

Additionally, you'll need to install some config dependencies:

```text
npm install --save-dev @typescript-eslint/eslint-plugin
```

### React

For React projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["greencoast/react"]
}
```

Additionally, you'll need to install some config dependencies:

```text
npm install --save-dev eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-flowtype eslint-plugin-import eslint-plugin-react-hooks
```

### React (TypeScript)

For React with TypeScript projects, you should use the following config inside your `eslint` config:

```json
{
  "extends": ["greencoast/react-ts"]
}
```

Additionally, you'll need to install some config dependencies:

```text
npm install --save-dev @typescript-eslint/eslint-plugin eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-flowtype eslint-plugin-import eslint-plugin-react-hooks
```

## Rule Overriding

In addition to including this config and its derivatives, you can override rules by adding the following to your `eslint` config:

```json
{
  "extends": [
    "greencoast/@type"
  ],
  "rules": {
    "eslint-rule-name": ["enabled", "options"]
    ...
  }
}
```

## Author

This ESLint config was made by [Greencoast Studios](https://github.com/greencoast-studios).
