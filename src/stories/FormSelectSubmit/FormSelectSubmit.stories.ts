import type { Meta, StoryObj } from "@storybook/react";
import { FormSelectSubmit } from "./FormSelectSubmit";
import { http, HttpResponse } from "msw";

export const mockHandler = [
    http.get("/options", () => {
        return HttpResponse.json({
            options: [
                { label: "Option 1", value: "opt-1" },
                { label: "Option 2", value: "opt-2" },
                { label: "Option 3", value: "opt-3" },
            ],
        });
    }),

    http.post("/submit-form", async () => {
        return HttpResponse.json({
            message: "Form received successfully",
        });
    }),
];

const meta: Meta<typeof FormSelectSubmit> = {
    component: FormSelectSubmit,
    title: "Forms/FormSelectSubmit",
    argTypes: {
        style: {
            control: "object", // Storybook 上で変更できる
        },
        onSubmit: {
            action: "submit-form", // Controls パネルに表示される
        },
    },
    parameters: {
        msw: {
            handlers: mockHandler
        },
    },
    excludeStories: ['mockHandler']
};

export default meta;

type Story = StoryObj<typeof FormSelectSubmit>;

export const Default: Story = {
    args: {
        style: {
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#f0f0f0",
        },
        onSubmit: (selected: string) => {
            console.log("submit-form", selected); // Controls パネルに表示される
        },
    },
};
