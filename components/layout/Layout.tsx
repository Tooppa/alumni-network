import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import Container from '../container/Container'

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps): React.ReactElement{
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