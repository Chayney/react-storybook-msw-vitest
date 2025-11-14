import type { FC } from 'react'

type Props = {
    label: string,
    style?: React.CSSProperties
}

export const CommonButton: FC<Props> = (props) => {
    const { label, style } = props;

    return (
        <button style={style}>{label}</button>
    )
}