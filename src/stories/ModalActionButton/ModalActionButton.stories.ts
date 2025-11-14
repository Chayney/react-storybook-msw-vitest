import type { Meta, StoryObj } from "@storybook/react";
import { ModalActionButton } from "./ModalActionButton";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof ModalActionButton> = {
    component: ModalActionButton,
    title: "Buttons/ModalActionButton",
    argTypes: {
        style: { control: "object" }
    },
    parameters: {
        msw: {
            handlers: [
                http.get("/modal-action", () => {
                    return HttpResponse.json({ message: "Modal Action Success!" });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof ModalActionButton>;

export const Default: Story = {
    args: {
        style: { padding: "10px 20px", backgroundColor: "#ddd" }
    }
};
