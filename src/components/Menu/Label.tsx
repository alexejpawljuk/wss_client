import React, {FC, ReactNode} from 'react'

const Label: FC<{children?: ReactNode}> = ({children}): JSX.Element => {
    return (
        <div
            className="row justify-content-center align-items-center"
            style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}
        >{ children }</div>
    );
};

export default Label