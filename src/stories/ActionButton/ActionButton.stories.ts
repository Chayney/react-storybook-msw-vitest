import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof ActionButton> = {
    component: ActionButton,
    title: "ActionButton",
    argTypes: {
        style: { control: "object" }
    },
    parameters: {
        msw: {
            handlers: [
                http.get("/action", () => {
                    return HttpResponse.json({ ok: true });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
    args: {
        style: { padding: "10px 20px", backgroundColor: "white" }
    }
};
