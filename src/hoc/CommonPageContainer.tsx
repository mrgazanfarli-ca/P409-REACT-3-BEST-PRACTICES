import React from 'react';
import { Header } from '../components/Header';
import { Container } from 'reactstrap';

export const CommonPageContainer: React.FC = ({ children }) => {
    return (
        <>
            <Container>
                <Header />
                {children}
            </Container>
        </>
    )
}
