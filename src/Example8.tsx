import React, { createContext, useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'

export const Example8 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    When we use props.children and Parent renders we don't have to update
                    Child because it's handled by GrandParent.
                `}
                <br />
                <br />
                {`
                    However, if we switch to using props.children() from Parent, GrandParent
                    only provides a function which will eventually return Child, but has to
                    first be invoked by Parent. Since the child function is inlined, it means
                    we're creating a new Child on every render, meaning Child will now be
                    rendered even though it's technically owned by GrandParent.
                `}
                <br />
                <br />
                {`
                    If we want to skip renders on Child we have to go back to 
                    using a memoization scheme.
                `}
            </div>

            <div style={{ padding: '10px' }}>
                <GrandParent />
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

const GrandParent = () => {
    return (
        <>
            <div>
                {'GrandParent'}
            </div>
            <Parent>
                {(someArg) => (
                    <>
                        {`Some arg: ${someArg}`}
                        <Child />
                    </>
                )}
            </Parent>
        </>
    )
}

const Parent = (props: { children: (someArg: any) => React.ReactNode }) => {
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

                {props.children(state)}
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