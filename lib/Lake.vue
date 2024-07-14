<template>
  <component :is="toRender?.component" v-bind="toRender?.props" />
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import type { Route, MainRoute } from "./@types/route";

const props = defineProps<{
  load: {
    routes: Array<Route>,
    main: MainRoute
  }
}>();

const load = reactive(props.load);

const toRender = computed(() => {
  const component = load.routes.find((route) => route.name === load.main);
  if (component) return component;
  return null;
})
</script>