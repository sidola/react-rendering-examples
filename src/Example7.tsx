import React, { createContext, useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { SourceLink } from './SourceLink'

export const Example7 = (): JSX.Element | null => {

    return (
        <>
            <div style={{
                background: 'whitesmoke',
                borderBottom: '1px solid black',
                padding: '10px'
            }}>
                {`
                    In addition to React.memo, we can also bypass rendering Child by not
                    referencing it directly in our Parent component. To accomplish this we
                    must introduce a GrandParent component who will instantiate both Parant
                    and Child for us, passing Child in as a prop to Parent.
                `}
                <br />
                <br />
                {`
                    Once Child is passed in via props.children to Parent, state updated inside
                    Parent will no longer be able to cause a re-render of Child, since that
                    component is owned by GrandParent, who has not had a state update.
                `}
                <br />
                <br />
                {`
                    GrandChild is still being correctly updated since it's subscribed to the
                    context we're updating and react is aware of this.
                `}
            </div>

            <div style={{ padding: '10px', flexGrow: '1' }}>
                <GrandParent />
            </div>

            <SourceLink href={"Example7"} />
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
                <Child />
            </Parent>
        </>
    )
}

const Parent = (props: { children: React.ReactNode }) => {
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

                {props.children}
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