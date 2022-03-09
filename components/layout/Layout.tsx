import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}