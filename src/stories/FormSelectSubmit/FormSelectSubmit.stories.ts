import type { Meta, StoryObj } from "@storybook/react";
import { FormSelectSubmit } from "./FormSelectSubmit";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof FormSelectSubmit> = {
    component: FormSelectSubmit,
    title: "Forms/FormSelectSubmit",
    argTypes: {
        style: {
            control: "object", // Storybook 上で変更できる
        },
        onSubmit: {
            action: "submit-form", // controls パネルに表示される
        },
    },
    parameters: {
        msw: {
            handlers: [
                // セレクト項目取得 API
                http.get("/options", () => {
                    return HttpResponse.json({
                        options: [
                            { label: "Option 1", value: "opt-1" },
                            { label: "Option 2", value: "opt-2" },
                            { label: "Option 3", value: "opt-3" },
                        ],
                    });
                }),

                // フォーム送信 API
                http.post("/submit-form", async () => {
                    return HttpResponse.json({
                        message: "Form received successfully",
                    });
                }),
            ],
        },
        actions: {
            handles: ["click"]
        }
    },
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
            console.log("submit-form", selected);
        },
    },
};
