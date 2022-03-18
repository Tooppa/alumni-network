import React from 'react';
import Container from './Container';
import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps){
    return (
        <>
            <Container>
                <Navbar />
                <Content>
                    {children}
                </Content>
                <Footer />
            </Container>
        </>
    )
}