![Version](https://img.shields.io/npm/v/@starfederation/datastar)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40starfederation%2Fdatastar)
![GitHub](https://img.shields.io/github/license/starfederation/datastar)
![Discord](https://img.shields.io/discord/1296224603642925098)
![GitHub Repo stars](https://img.shields.io/github/stars/starfederation/datastar?style=flat)

<p align="center"><img width="200" src="https://media.githubusercontent.com/media/starfederation/datastar/refs/heads/develop/site/static/images/rocket.gif"></p>

# Datastar

### The hypermedia framework.

Datastar helps you build reactive web applications with the simplicity of server-side rendering and the power of a full-stack SPA framework.

Getting started is as easy as adding a single script tag to your HTML.

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar/bundles/datastar.js"></script>
```

Then start adding frontend reactivity using declarative <code>data-*</code> attributes.

```html
<input data-bind-title type="text">
<div data-text="title.value.toUpperCase()"></div>
<button data-on-click="sse('/endpoint', {method: 'post'})">Save</button>
```

Visit the [Datastar Website »](https://data-star.dev/)

Join the [Discord Server »](https://discord.com/channels/1296224603642925098/1296224603642925102)

## Getting Started

Read the [Getting Started Guide »](https://data-star.dev/guide/getting_started)

## Contributing

Read the [Contribution Guidelines »](CONTRIBUTING.md)

## Custom Plugins

You can manually add your own plugins to the core:

```html
<script type="importmap">
{
    "imports": {
      "datastar": "https://cdn.jsdelivr.net/gh/starfederation/datastar/bundles/datastar-core.js"
    }
}
</script>
<script type="module">
import {Datastar} from 'datastar'

Datastar.load(
    // I can make my own plugins!
)
</script>
```