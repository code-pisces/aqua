const ComponentA = {
  template: "Hello"
}
export const ComponentB = {
  template: "{{ name }}",
  props: ['name']
}

export const ROUTES = [
  {
    name: "component-a",
    component: ComponentA,
    props: {}
  },
  {
    name: "component-b",
    component: ComponentB,
    props: {
      name: "Josh",
    }
  }
];