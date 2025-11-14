import { useState } from "react";
import type { FC } from "react";

type Props = {
    style?: React.CSSProperties;
};

export const ToastButton: FC<Props> = ({ style }) => {
    const [toast, setToast] = useState<string>("");

    const handleClick = async () => {
        try {
            const res = await fetch("/notify");
            const data = await res.json();

            setToast(data.message);
            setTimeout(() => setToast(""), 2000);
        } catch {
            setToast("Error occurred");
        }
    };

    return (
        <div>
            <button style={style} onClick={handleClick}>Show Toast</button>
            {toast && (
                <div style={{ marginTop: 10, padding: 10, background: "#333", color: "white" }}>
                    {toast}
                </div>
            )}
        </div>
    );
};
