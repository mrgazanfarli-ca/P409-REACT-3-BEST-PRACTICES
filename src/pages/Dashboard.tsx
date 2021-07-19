import React from 'react';
import { Col, Row } from 'reactstrap';

import { CommonPageContainer } from '../hoc/CommonPageContainer';

export const DashboardPage: React.FC = () => {
    return (
        <CommonPageContainer>
            <Row>
                <Col xs={12}>
                    <h3 className="text-success mt-4">This is the home page</h3>
                </Col>
            </Row>
        </CommonPageContainer>
    )
}
