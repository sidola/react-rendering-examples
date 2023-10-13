import React from 'react'
import { useEffect, useState } from 'react'
import { SourceLink } from './SourceLink'

export const Example2 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {'Here, the Child component is wrapped in React.memo and will not update.'}
            </div>

            <div style={{ padding: '10px', flexGrow: '1' }}>
                <Parent />
            </div>

            <SourceLink href={"Example2"} />
        </>
    )
}

// ---------------------------------------------------------------------------------------
//
// Implementation below.
//
// ---------------------------------------------------------------------------------------

const Parent = () => {
    const [state, setState] = useState(0)

    useEffect(() => {
        console.log("Parent rendered")
    })

    return (
        <>
            <button onClick={() => {
                console.clear()
                setState(state + 1)
            }}>
                {`Increment (current: ${state})`}
            </button>

            <div>
                {'Parent'}
            </div>

            <Child />
        </>
    )
}

const Child = React.memo(() => {
    useEffect(() => {
        console.log("Child rendered")
    })

    return (
        <>
            <div>
                {'Child'}
            </div>
            <GrandChild />
        </>
    )
})

const GrandChild = () => {
    useEffect(() => {
        console.log("GrandChild rendered")
    })

    return (
        <div>
            {'GrandChild'}
        </div>
    )
}