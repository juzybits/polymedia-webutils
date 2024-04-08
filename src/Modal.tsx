export const Modal: React.FC<{
    content: React.ReactNode;
    styleBackground?: React.CSSProperties;
    styleContent?: React.CSSProperties;
}> = ({
    content,
    styleBackground = {},
    styleContent = {},
}) =>
{
    if (!content) {
        return null;
    }

    const mergedBackgroundStyle = { ...defaultStyleBackground, ...styleBackground };
    const mergedContentStyle = { ...defaultStyleContent, ...styleContent };

    return (
        <div className='modal-background' style={mergedBackgroundStyle}>
            <div className='modal-content' style={mergedContentStyle}>
                {content}
            </div>
        </div>
    );
}

const defaultStyleBackground: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100lvh',
    zIndex: '1000',
    overflowY: 'auto',
    padding: '1em',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

const defaultStyleContent: React.CSSProperties = {
    position: 'relative',
    margin: '0 auto',
    width: 'min(800px, 100%)',
    overflowWrap: 'break-word',
    overflowY: 'scroll',
    borderRadius: '10px',
    padding: '1.7em 1.9em 2.1em',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(255 255 255)',
    fontSize: '1.2em',
    textAlign: 'center',
    color: 'black',
};
