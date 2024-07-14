import { markRaw } from "vue";
import { Route } from "./@types/route";

export function createLake(routes: Array<Route>, main: string) {
  return { routes: routes.map((route) => markRaw(route)), main };
}
