import { useState } from "react";
import type{ FC } from "react";

type Props = {
    style?: React.CSSProperties;
};

export const ModalActionButton: FC<Props> = ({ style }) => {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState("");

    const execute = async () => {
        try {
            const res = await fetch("/modal-action");
            const data = await res.json();
            setResult(data.message);
        } catch {
            setResult("Error");
        }
    };

    return (
        <div>
            <button style={style} onClick={() => setOpen(true)}>
                Open Modal
            </button>

            {open && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{ background: "white", padding: 20 }}>
                        <p>Modal Action</p>
                        <button onClick={execute}>Run API</button>
                        <button onClick={() => setOpen(false)}>Close</button>
                        {result && <p>{result}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
