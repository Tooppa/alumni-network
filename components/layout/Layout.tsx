import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import Container from '../container/Container'
import Content from '../content/Content';

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Container>
                <Navbar />
                <Content>
                    <main className="flex-grow">
                        {children}
                    </main>
                </Content>
                <Footer />
            </Container>
        </>
    )
}