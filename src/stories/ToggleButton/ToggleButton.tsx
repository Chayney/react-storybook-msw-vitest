import { useState } from "react";
import type{ FC } from "react";

type Props = {
    style?: React.CSSProperties;
};

export const ToggleButton: FC<Props> = ({ style }) => {
    const [enabled, setEnabled] = useState(false);

    const toggle = async () => {
        try {
            const res = await fetch("/toggle");
            const data = await res.json();
            setEnabled(data.enabled);
        } catch {
            console.error("toggle error");
        }
    };

    return (
        <button style={style} onClick={toggle}>
            {enabled ? "ON" : "OFF"}
        </button>
    );
};
