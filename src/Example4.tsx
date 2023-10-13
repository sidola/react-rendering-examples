import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'

export const Example4 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    To fix the broken React.memo + props.children interaction we need to wrap
                    the Child element in our Parent in an additional layer of memo.
                `}
            </div>

            <div style={{ padding: '10px' }}>
                <Parent />
            </div>
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

    const MChild = useMemo(() => (
        <Child>
            <div>
                {'props.children from Parent'}
            </div>
        </Child>
    ), [])

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

            {MChild}
        </>
    )
}

const Child = React.memo((props: { children: React.ReactNode }) => {
    useEffect(() => {
        console.log("Child rendered")
    })

    return (
        <>
            <div>
                {'Child'} {' '} {props.children}
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