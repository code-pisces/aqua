import { describe, expect, it } from "vitest";

import { createLake } from "../lib/main";
import { ROUTES } from "./mocks/lake-routes";

describe("createLake", () => {
  it("should able to return lake routes after created", () => {
    const lake = createLake(ROUTES, "component-a");

    expect(lake.routes).toEqual(ROUTES)
  })

  it("should able to return lake main view", () => {
    const lake = createLake(ROUTES, "component-a");

    expect(lake.main).toBe("component-a")
  })
})