import { useState } from 'react'
import { Example1 } from './Example1'
import { Example2 } from './Example2'
import { Example3 } from './Example3'
import { Example4 } from './Example4'
import { Example5 } from './Example5'
import { Example6 } from './Example6'
import { Example7 } from './Example7'
import { Example8 } from './Example8'
import { Example9 } from './Example9'
import { Example10 } from './Example10'

export const Container = (): JSX.Element | null => {

    const [state, setState] = useState<{
        currentView: string
        views: Record<string, {
            component: JSX.Element,
            style: React.CSSProperties
        }>
    }>({
        currentView: "Default",
        views: {
            ["Default"]: {
                component: <Example1 />,
                style: { background: 'lightgreen' }
            },
            ["React.memo"]: {
                component: <Example2 />,
                style: { background: 'lightgreen' }
            },
            ["Break React.memo with props.children"]: {
                component: <Example3 />,
                style: { background: 'lightcoral' }
            },
            ["Fix React.memo + props.children with more memo"]: {
                component: <Example4 />,
                style: { background: 'lightgreen' }
            },
            ["Context: Basics"]: {
                component: <Example5 />,
                style: { background: 'lightgreen' }
            },
            ["Context: Skip Child render using React.memo"]: {
                component: <Example6 />,
                style: { background: 'lightgreen' }
            },
            ["Context: Skip Child render using props.children"]: {
                component: <Example7 />,
                style: { background: 'lightgreen' }
            },
            ["props.children vs props.children()"]: {
                component: <Example8 />,
                style: { background: 'lightcoral' }
            },
            ["useContext inside of React.memo"]: {
                component: <Example9 />,
                style: { background: 'lightgreen' }
            },
            ["Context: Skip renders when using multiple contexts"]: {
                component: <Example10 />,
                style: { background: 'lightgreen' }
            },
        }
    })

    return (
        <div style={{
            display: 'flex',
            width: '960px',
            margin: '10px auto',
            gap: '10px',
            flexDirection: 'column'
        }}>
            <div style={{
                width: '100%',
                textAlign: 'center',
                background: 'whitesmoke',
                border: '1px solid black',
                padding: '10px 0px'
            }}>
                {'Open the console (F12) to see render logging'}
            </div>
            <div style={{
                display: 'flex',
                gap: '10px'
            }}>
                <div style={{
                    width: '25%',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {Object.entries(state.views).map(item => {
                        return (
                            <button
                                style={{
                                    ...item[1].style,
                                    // border: '1px solid black',
                                    padding: '5px'
                                }}
                                key={item[0]}
                                onClick={() => {
                                    setState(prev => ({
                                        ...prev,
                                        currentView: item[0]
                                    }))
                                }}
                            >
                                {item[0]}
                            </button>
                        )
                    })}
                </div>

                <div style={{
                    width: '75%',
                    border: '1px solid black'
                }}>
                    {state.views[state.currentView].component}
                </div>
            </div>
        </div>
    )
}