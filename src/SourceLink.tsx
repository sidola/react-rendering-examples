type SourceLinkProps = {
    href: string
}

export const SourceLink = (props: SourceLinkProps): JSX.Element | null => {

    return (
        <div style={{
            padding: '10px 0px',
            width: '100%',
            textAlign: 'center',
            borderTop: '1px solid black',
        }}>
            <a
                href={`https://github.com/sidola/react-rendering-examples/blob/master/src/${props.href}.tsx`}
                target="_blank"
            >
                {'Source'}
            </a>
        </div>
    )
}