import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";

import StopSearch from "../components/StopSearch.vue";

describe("StopSearch", () => {
  it("renders input", () => {
    const wrapper = mount(StopSearch, {
      props: {
        modelValue: "",
      },

      global: {
        directives: {
          focus: {
            mounted(el) {
              el.focus();
            },
          },
        },
      },
    });

    const input = wrapper.find("input");

    expect(input.exists()).toBe(true);
  });

  it("updates input value", async () => {
    const wrapper = mount(StopSearch, {
      props: {
        modelValue: "",
      },

      global: {
        directives: {
          focus: {
            mounted(el) {
              el.focus();
            },
          },
        },
      },
    });

    const input = wrapper.find("input");

    await input.setValue("Wrzeszcz");

    expect(input.element.value).toBe("Wrzeszcz");
  });
});
