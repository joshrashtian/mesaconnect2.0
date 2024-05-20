import React from 'react';

const Layout = ({ children} : {children: React.ReactNode}) => {
    return (
        <main className="p-14">
            {children}
        </main>
    );
};

export default Layout;