import React, {FC, ReactNode} from 'react'

const OptionsPlace: FC<{children?: ReactNode}> = ({children}) => {
    return (
        <div className="pb-2 pt-3" style={{height: "20vh", minHeight: "194px", border: "1px solid rgba(140, 140, 140, 0.35)"}}>
            {children}
        </div>
    );
};

export default OptionsPlace