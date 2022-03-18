import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Content from './Content';
import Container from '../Container';

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