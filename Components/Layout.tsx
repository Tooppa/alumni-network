import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Container from './Container'

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps){
    return (
        <>
            <Container>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </Container>
        </>
    )
}