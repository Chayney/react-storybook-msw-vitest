import type { Meta, StoryObj } from "@storybook/react"
import { CommonButton } from "./CommonButton"

// storybook用メタ情報
const meta: Meta<typeof CommonButton> = {
    component: CommonButton,
    title: "CommonButton",
    argTypes: {
        style: {
            // storybook上で{backgroundColor: "red"}みたいに変更可能
            control: 'object'
        }
    }
}

export default meta

type Story = StoryObj<typeof CommonButton>

export const Default: Story = {
    // コンポーネントからのprops
    args: {
        label: 'TEST',
        // 変更が多いプロパティを設定(他のプロパティはカタログ上で追加可能)
        style: { backgroundColor: "#f0f0f0", color: "#000", padding: "10px 20px", borderRadius: "5px" }
    }
}