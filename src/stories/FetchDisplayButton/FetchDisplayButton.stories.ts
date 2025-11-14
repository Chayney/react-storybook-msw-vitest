import type { Meta, StoryObj } from "@storybook/react";
import { FetchDisplayButton } from "./FetchDisplayButton";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof FetchDisplayButton> = {
    component: FetchDisplayButton,
    title: "Buttons/FetchDisplayButton",
    argTypes: {
        style: { control: "object" }
    },
    parameters: {
        msw: {
            handlers: [
                http.get("/fetch-data", () => {
                    return HttpResponse.json({ message: "Fetched successfully!" });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof FetchDisplayButton>;

export const Default: Story = {
    args: {
        style: { padding: "10px 20px", backgroundColor: "#fafafa" }
    }
};
