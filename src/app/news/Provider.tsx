"use client"

import {ArticleModalProvider} from "@/app/news/ArticleModal";

const Provider = ({ children } : {children: React.ReactNode}) => {
    return (
        <ArticleModalProvider>
            {children}
        </ArticleModalProvider>
    );
};

export default Provider;