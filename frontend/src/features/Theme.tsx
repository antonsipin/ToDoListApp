import { useState } from 'react'
import './Theme.css'

export default function Theme(): JSX.Element {
    const [theme, setTheme] = useState('white')

    return (
        <>
            <select className='Theme' value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
                <option value='white'>White</option>
                <option value='black'>Black</option>
            </select>
        </>
    )
}