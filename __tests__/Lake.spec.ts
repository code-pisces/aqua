import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { createLake, Lake } from "../lib/main";
import { ComponentB, ROUTES } from "./mocks/lake-routes";

describe("Lake", () => {
  it("should be able mount the main route (component-a)", () => {
    const lake = createLake(ROUTES, "component-a");
    const wrapper = mount(Lake, {
      props: {
        load: lake,
      },
    });

    expect(wrapper.text()).toContain("Hello");
  });

  it("should be able mount the main route (component-b) watching the route props", () => {
    const lake = createLake(
      [
        {
          name: "component-b",
          component: ComponentB,
          props: {
            name: "Josh",
          },
        },
      ],
      "component-b"
    );
    const wrapper = mount(Lake, {
      props: {
        load: lake,
      },
    });

    expect(wrapper.text()).toContain("Josh");
  });

  it("should not show the component-b while component-a is mounted", () => {
    const lake = createLake(ROUTES, "component-a");
    const wrapper = mount(Lake, {
      props: {
        load: lake,
      },
    });

    expect(wrapper.text()).not.toContain("Josh"); 
  })
});
