# eslint-config-greencoast

A shareable ESLint config used by Greencoast Studios.

## Requirements

This config uses certain plugins that allow to add more specific rules, these plugins must be installed on your project as `devDependencies`. To do so, run:

    npm install --save-dev eslint-plugin-jsx-a11y eslint-plugin-react

In case you're using **yarn**:

    yarn add -D eslint-plugin-jsx-a11y eslint-plugin-react

## Usage

Inside whatever `eslint` file you're using, add the following directive to add the rules specified in this config:

```json
{
  "extends": [
    "greencoast/@type"
  ]
}
```

> `@type` can be the following: `es6`, `node` and `react`.
>
> If you add only `"greencoast"` inside the `extends`, all the 3 rule settings will be used.
>
> `es6` works as the base, `node` extends it and `react` extends it too alongside `react-app` config.

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
