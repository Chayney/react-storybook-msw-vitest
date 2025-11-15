import { useState, useEffect } from "react";
import type{ FC } from "react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    style?: React.CSSProperties;
    onSubmit?: (selected: string) => void;
};

export const FormSelectSubmit: FC<Props> = ({ style, onSubmit }) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<string>("");
    const [state, setState] = useState<"idle" | "loadingOptions" | "sending" | "success" | "error">("idle");

    // セレクト項目を初期取得
    useEffect(() => {
        const fetchOptions = async () => {
            setState("loadingOptions");
            try {
                const res = await fetch("/options");
                const data = await res.json();
                setOptions(data.options);
                setState("idle");
            } catch {
                setState("error");
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async () => {
        if (!selected) return alert("Please select an option.");

        setState("sending");

        try {
            const res = await fetch("/submit-form", {
                method: "POST",
                body: JSON.stringify({ selected }),
            });

            if (!res.ok) throw new Error();
            await res.json();
            setState("success");
            onSubmit?.(selected);
        } catch {
            setState("error");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <select
                style={style}
                value={selected}
                disabled={state === "loadingOptions"}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option value="">-- Select an option --</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <button
                style={style}
                onClick={handleSubmit}
                disabled={state === "sending"}
            >
                {{
                    idle: "Submit Form",
                    loadingOptions: "Loading...",
                    sending: "Sending...",
                    success: "Sent!",
                    error: "Error!",
                }[state]}
            </button>

            {state === "success" && <p style={{ color: "green" }}>Form submitted successfully!</p>}
            {state === "error" && <p style={{ color: "red" }}>Error occurred.</p>}
        </div>
    );
};
