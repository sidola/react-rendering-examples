import React, { createContext, useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { SourceLink } from './SourceLink'

export const Example10 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    There's no particular magic when using multiple different contexts.
                    Whenever a component updates via context, everything below it that isn't
                    memoized is also updated.
                `}
                <br />
                <br />
                {`
                    If we want to re-render GrandChild without also re-rendering GrandGrandChild
                    we need to memoize it.
                `}
            </div>

            <div style={{ padding: '10px', flexGrow: '1' }}>
                <Parent />
            </div>

            <SourceLink href={"Example10"} />
        </>
    )
}

// ---------------------------------------------------------------------------------------
//
// Implementation below.
//
// ---------------------------------------------------------------------------------------

const SomeContext = createContext(0)
const SomeOtherContext = createContext(0)

const Parent = () => {
    const [state, setState] = useState(0)
    const [state2, setState2] = useState(0)

    useEffect(() => {
        console.log("Parent rendered")
    })

    return (
        <>
            <SomeContext.Provider value={state}>
                <SomeOtherContext.Provider value={state2}>
                    <button onClick={() => {
                        console.clear()
                        setState(state + 1)
                    }}>
                        {`Increment GrandChild (current: ${state})`}
                    </button>
                    <button onClick={() => {
                        console.clear()
                        setState2(state2 + 1)
                    }}>
                        {`Increment GrandGrandChild (current: ${state2})`}
                    </button>

                    <div>
                        {'Parent'}
                    </div>

                    <Child />
                </SomeOtherContext.Provider >
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

const GrandChild = () => {
    useEffect(() => {
        console.log("GrandChild rendered")
    })

    const value = useContext(SomeContext)

    return (
        <>
            <div>
                {'GrandChild'} {' '} {value}
            </div>

            <GrandGrandChild />
        </>
    )
}

const GrandGrandChild = () => {
    useEffect(() => {
        console.log("GrandGrandChild rendered")
    })

    const value = useContext(SomeOtherContext)

    return (
        <div>
            {'GrandGrandChild'} {' '} {value}
        </div>
    )
}