import type { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "./ToggleButton";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof ToggleButton> = {
    component: ToggleButton,
    title: "Buttons/ToggleButton",
    argTypes: {
        style: { control: "object" }
    },
    parameters: {
        msw: {
            handlers: [
                http.get("/toggle", () => {
                    return HttpResponse.json({ enabled: Math.random() > 0.5 });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
    args: {
        style: { padding: "10px 20px", backgroundColor: "#eee" }
    }
};
