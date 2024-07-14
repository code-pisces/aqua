import { defineComponent } from "vue";
import { describe, it } from "vitest";

import { createLake } from "../lib/createLake";

const ComponentA = defineComponent({
  template: "<template> Hello </template>"
})
const ComponentB = defineComponent({
  template: "<template> {{ name }} </template>",
  props: ['name']
})

describe("createLake", () => {


  it("should able to return lake routes after created", () => {
    

    const lake = createLake([
      {
        name: "component-a",
        component: ComponentA,
        props: {}
      },
      {
        name: "component-b",
        component: ComponentB,
        props: {}
      }
    ])
  })
})