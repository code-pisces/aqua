import { Component } from "vue";

export type Route = {
  name: string;
  props?: Record<string, unknown>;
  component: Component;
}

export type MainRoute = Route['name'];