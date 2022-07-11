import React, {FC} from 'react';

type LayoutType = {
    children: React.ReactNode
}


const Layout: FC<LayoutType> = ({children}) => {
    return <div>
        {children}
    </div>
};
export default Layout;
