import React from 'react';
import Container from './Container';
import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({...props}){
    return (
        <Container>
            <Navbar />
            <Content>
                {props.children}
            </Content>
            <Footer />
        </Container>
    )
}