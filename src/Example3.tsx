import React from 'react'
import { useEffect, useState } from 'react'

export const Example3 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    Here we break React.memo by using props.children in our memoized component.
                    This happens because every render of Parent creates a new <div/> element.
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

            <Child>
                <div>
                    {'props.children from Parent'}
                </div>
            </Child>
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