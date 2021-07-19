import React from 'react';
import { Col, Row, Table } from 'reactstrap';

import { IUser } from '../models';

import { CommonPageContainer } from '../hoc/CommonPageContainer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UsersList } from '../components/UsersList';
import { useHistory } from 'react-router-dom';
import { useAsyncData } from '../hooks/useAsyncData';

interface IRoutingData {
    comesFromPosts: boolean;
}

export const UsersPage: React.FC = () => {
    const [usersData] = useAsyncData<IUser[]>('https://jsonplaceholder.typicode.com/users');
    const history = useHistory<IRoutingData>();
    console.log(history.location.state?.comesFromPosts);

    return (
        <CommonPageContainer>
            <Row>
                <Col xs={12}>
                    <h3 className="text-success mt-4">Users</h3>
                    {usersData.loading && <LoadingSpinner />}
                    {Boolean(usersData.error) && <h4 className="text-danger text-center">Error occurred while fetching data</h4>}
                    {!!usersData.data && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                            <UsersList users={usersData.data} />
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </CommonPageContainer>
    )
}
