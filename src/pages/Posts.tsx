import React, { ChangeEvent } from 'react';
import { CommonPageContainer } from '../hoc/CommonPageContainer';
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap';
import { useAsyncData } from '../hooks/useAsyncData';
import { IPost, IUser } from '../models';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useHistory } from 'react-router-dom';

export const PostsPage: React.FC = () => {
    const history = useHistory();
    const searchParams = new URLSearchParams(history.location.search);
    const userId = searchParams.get('userId');
    const [selectUserValue, setSelectUserValue] = React.useState(userId ?? undefined);
    const [usersData] = useAsyncData<IUser[]>('https://jsonplaceholder.typicode.com/users');
    const [posts, getPosts] = useAsyncData<IPost[]>('https://jsonplaceholder.typicode.com/posts');

    const handleUserIdChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        history.push(`/posts?userId=${event.target.value}`);
    }, [history]);

    const renderSelectOptions = React.useCallback(() => {
        const options: JSX.Element[] = [];

        if (!!usersData.data) {
            usersData.data.forEach(({ id, name }) => {
                options.push(<option key={id} value={id}>{name}</option>);
            });

            return (
                <>
                    <option>Select a user</option>
                    {options}
                </>
            );
        }
    }, [usersData]);

    React.useEffect(() => {
        if (!!userId) {
            setSelectUserValue(userId);
            getPosts({ userId });
        }
    }, [getPosts, userId]);

    const renderContent = React.useCallback(() => {
        if (posts.loading) {
            return (
                <div className="pt-3">
                    <LoadingSpinner />
                </div>
            );
        } else if (posts.error) {
            return <h4 className="mt-3 text-danger">Error occurred</h4>;
        } else {
            return posts.data?.map(({ title, body, id }) => (
                <Card key={id} className="mt-3">
                    <CardHeader>{title}</CardHeader>
                    <CardBody>{body}</CardBody>
                </Card>
            ))
        }
    }, [posts]);

    return (
        <CommonPageContainer>
            <Row className="my-3">
                <Col xs={4}>
                    <Label>Select user:</Label>
                    <Input type="select" value={selectUserValue} disabled={usersData.loading || !!usersData.error} onChange={handleUserIdChange}>
                        {renderSelectOptions()}
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {renderContent()}
                </Col>
            </Row>
        </CommonPageContainer>
    )
}
