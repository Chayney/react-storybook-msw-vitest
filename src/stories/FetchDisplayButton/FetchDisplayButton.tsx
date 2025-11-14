import { useState } from "react";
import type{ FC } from "react";

type Props = {
    style?: React.CSSProperties;
};

export const FetchDisplayButton: FC<Props> = ({ style }) => {
    const [data, setData] = useState<string>("");

    const handleClick = async () => {
        try {
            const res = await fetch("/fetch-data");
            const json = await res.json();
            setData(json.message);
        } catch {
            setData("Error fetching data");
        }
    };

    return (
        <div>
            <button style={style} onClick={handleClick}>
                Fetch Data
            </button>
            {data && <p>{data}</p>}
        </div>
    );
};
