import React, { createContext, useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { SourceLink } from './SourceLink'

export const Example5 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    Here we use a basic context to pass values between Parent and GrandChild
                    without having to prop-drill past Child. Notice how the entire tree is
                    rendered even though Child has no interest in the data being passed.
                `}
            </div>

            <div style={{ padding: '10px', flexGrow: '1' }}>
                <Parent />
            </div>

            <SourceLink href={"Example5"} />
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

const Child = () => {
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
}

const GrandChild = () => {
    useEffect(() => {
        console.log("GrandChild rendered")
    })

    const value = useContext(SomeContext)

    return (
        <div>
            {'GrandChild'} {' '} {value}
        </div>
    )
}