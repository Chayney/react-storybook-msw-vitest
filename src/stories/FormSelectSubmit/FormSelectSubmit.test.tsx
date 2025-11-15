import { test, expect, describe, vi, beforeAll, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { mockHandler } from "./FormSelectSubmit.stories";
import { FormSelectSubmit } from "./FormSelectSubmit";

const server = setupServer(...mockHandler);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("FormSelectSubmit", () => {
    test("should submit correct data", async () => {
        const user = userEvent.setup();
        const expectedSelectedVaue = 'opt-1';
        const submitHandler = vi.fn();

        render(<FormSelectSubmit onSubmit={submitHandler} />);

        // ① options が読み込まれるのを待つ
        await waitFor(() => {
            expect(screen.getAllByRole("option").length).toBe(4);
            // 初期option + 3つ
        });

        // ② combobox を取得
        const combobox = screen.getByRole("combobox");
        await user.selectOptions(combobox, expectedSelectedVaue);

        // ③ 選択する
        await user.selectOptions(combobox, "opt-1");

        // ④ submit ボタンを押す
        const submitButton = screen.getByRole("button", { name: 'Submit Form' });

        await user.click(submitButton);

        // ⑤ submit が呼ばれたか
        expect(submitHandler).toHaveBeenCalledWith(expectedSelectedVaue);
    });
});
