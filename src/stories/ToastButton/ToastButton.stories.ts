import type { Meta, StoryObj } from "@storybook/react";
import { ToastButton } from "./ToastButton";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof ToastButton> = {
    component: ToastButton,
    title: "Buttons/ToastButton",
    argTypes: {
        style: { control: "object" }
    },
    parameters: {
        msw: {
            handlers: [
                http.get("/notify", () => {
                    return HttpResponse.json({ message: "Operation completed!" });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof ToastButton>;

export const Default: Story = {
    args: {
        style: { padding: "10px 20px", backgroundColor: "#eee" }
    }
};
