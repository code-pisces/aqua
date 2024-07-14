
# Aqua
A virtual-routing for Vue 3, without using HTML routes system.

## The problem
One day, I was working on a project that needed a "sub-routing" system. The project required to have a multiples instances of a component that had their own routes, that feature intrigued me. While searching for a solution to the problem, I noticed that this was a common problem in apps like mine. I tested as many approaches as possible:

- **Using iFrames**: IFrames are a native way in the browser to handle using applications inside another. It looks perfect! But it's troublesome. I tried some PoC using this, but I had a lot of problems with CSP (Content Security Policy) and communication using the postMessage API.
- **Using components and custom components**: I'd tried, without success, using custom components in this app. Maybe that's would worked if the app weren't offline.
- **Micro-frontend**: In a conventional web app that would be the best approach. However, I tried run it in a Electron app, and I failed.

Thinking about this problem, every days, I found the way to make it work: creating a virtual-routing. Unlike vue-router, Aqua creates a local routing inside a context and it can be scaled to multiple instances of a component, allowing you to have two (or more) identical apps side by side on a single page.

## The solution
Vue provide to us, a special component called `component` that allows us rendering components dynamically. My first draft of Aqua looked some like this:
```html
<template>
  <component :is="subRoute" />
</template>

<script setup>
import { computed } from "vue";

const subRoute = computed(() => /* some logic */);
const subRoutes = [
  {
    name: "page-a",
    component: PageA,
  },
  {
    name: "page-b",
    component: PageB
  }
]
</script>
```
At first, it worked, but, this only worked with this really simple routes, in routes that uses params don't. And turned in a mess to handle with this combined with vue-routing. Using this approach I couldn't access the information about the route and even handle in a efficient way with redirection and manipulating the route programmatically. 

### Using Aqua
In principle, it's necessary creates the routes -- or in Aqua, lakes. To create a lake you can do like this:
```ts
// chess-app-lake.ts
import { createLake } from "aqua";

import StartGame from "@game/views/StartGame.vue";
import PlayChess from "@game/views/PlayChess.vue";

export const chessApp = createLake([
  {
    name: "start-game",
    component: StartGame,
    props: {} // you can pass props from here, or send props navigateTo
  },
  {
    name: "play-chess",
    component: PlayChess,
    props: {
      playerMode: "black"
    }
  }
]);
```
After created your lake, you can use in anywhere in your app:

```html
<!--App.vue (but you can use in anywhere)-->
<template>
  <h1>Welcome to the double chess table.</h1>
  <Lake name="table-left" :load="chessApp" />
  <Lake name="table-right" :load="chessApp" />
</template>

<script setup>
import { Lake } from "aqua";

import { chessApp } from "@lakes/chess-app-lakes";
</script>
```

Inside the lakes, like in the example above, you can do this to access the virtual-routing system:
```html
<!--StartGame.vue-->
<template>
  <button 
    class="start-game"
    @class="lake.navigateTo('play-chess', { playerMode: 'white' })">
      Start Game
  </button>
</template>

<script setup>
import { useLake } from "aqua";

const lake = useLake();
</script>
```
Don't worry about conflicts, lakes are scoped inside the `<Lake />` component.

## Install
To install Aqua in your project Vue 3:

```
npm install aqua
```

## Contribute
See our contributing policies, [here](.github/contribute.md).

## License
This project is under MIT license.
