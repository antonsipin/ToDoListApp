import React from 'react'
import style from './Button.module.css'

interface ButtonProps {
    onClick: () => void
    children: React.ReactNode
}

export default function Button({onClick, children}: ButtonProps): JSX.Element {
    return (
        <>
            <button className={style.button} onClick={onClick}>{children}</button>
        </>
    )
}