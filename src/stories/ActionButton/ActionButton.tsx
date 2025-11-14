import { useState } from "react";
import type { FC } from "react";

type Props = {
    style?: React.CSSProperties;
};

export const ActionButton: FC<Props> = ({ style }) => {
    const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleClick = async () => {
        setState("loading");

        try {
            const res = await fetch("/action");
            if (!res.ok) throw new Error();
            await res.json();
            setState("success");
        } catch {
            setState("error");
        }
    };

    const label = {
        idle: "Execute Action",
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
    }[state];

    return (
        <button style={style} onClick={handleClick}>
            {label}
        </button>
    );
};
