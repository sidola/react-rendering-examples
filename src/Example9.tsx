import React, { createContext, useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'

export const Example9 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    When using React.memo on a component that is subscribed to a context,
                    context changes will be implicitly treated similar to prop changes and
                    the memoized component will be updated automatically when context
                    values change.
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

const SomeContext = createContext(0)

const Parent = () => {
    const [state, setState] = useState(0)

    useEffect(() => {
        console.log("Parent rendered")
    })

    return (
        <>
            <SomeContext.Provider value={state}>
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
            </SomeContext.Provider>
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

const GrandChild = React.memo(() => {
    useEffect(() => {
        console.log("GrandChild rendered")
    })

    const value = useContext(SomeContext)

    return (
        <div>
            {'GrandChild'} {' '} {value}
        </div>
    )
})