import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { Pencil, Trash, ArrowLeftCircle } from 'react-bootstrap-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { IPost } from '../models';

import { CommonPageContainer } from '../hoc/CommonPageContainer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CreatePostModal } from '../components/CreatePostModal';
import { EditPostModal } from '../components/EditPostModal';
import { useAsyncData } from '../hooks/useAsyncData';

interface IUserPostsParams {
    id: string;
}

const ERROR_MESSAGE = 'Unexpected error occurred, please, try again later :(';

export const UserPosts: React.FC = () => {
    const { id } = useParams<IUserPostsParams>();
    const [posts, getPosts] = useAsyncData<IPost[]>(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    const [isDeleteLoading, setDeleteLoading] = React.useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [editingPostId, setEditingPostId] = React.useState<number>();
    const history = useHistory();

    const handleBackClick = React.useCallback(() => {
        history.push('/users', { comesFromPosts: true });
    }, [history]);

    const toggleCreateModal = React.useCallback(() => {
        setCreateModalOpen(oldValue => !oldValue);
    }, []);

    // React.useEffect(() => {
    //     return () => {
    //         console.log('component getdi');
    //     }
    // }, []);

    const handleEditClick = React.useCallback((id: number) => {
        setEditingPostId(id);
    }, []);

    const handleDeleteClick = React.useCallback((id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setDeleteLoading(true);
            axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
                toast('Post has been deleted successfully', { type: 'success' });
                getPosts();
            }).catch(() => {
                toast(ERROR_MESSAGE, { type: 'error' });
            }).finally(() => {
                setDeleteLoading(false);
            });
        }
    }, [getPosts]);

    const renderBody = React.useCallback(() => {
        if (posts.loading) {
            return <LoadingSpinner />;
        } else if (posts.error) {
            return <h4 className="text-danger">Unexpected error occurred! :(</h4>;
        } else {
            return posts.data?.map(({ title, body, id }) => (
                <Card key={id} className="mt-3">
                    <CardHeader>{title}</CardHeader>
                    <CardBody>{body}</CardBody>
                    <CardFooter className="d-flex justify-content-end align-items-center">
                        <Button className="btn btn-primary" disabled={isDeleteLoading} onClick={() => handleEditClick(id)}>
                            <Pencil />
                        </Button>
                        <Button className="btn btn-danger ms-3" disabled={isDeleteLoading} onClick={() => handleDeleteClick(id)}>
                            <Trash />
                        </Button>
                    </CardFooter>
                </Card>
            ));
        }
    }, [handleDeleteClick, handleEditClick, posts.data, posts.error, posts.loading, isDeleteLoading]);

    const handleCreateModalClick = React.useCallback(() => {
        setCreateModalOpen(true);
    }, []);

    const handlePostCreateSuccess = React.useCallback(() => {
        toast('Post has been created successfully...', { type: 'success' });
        setCreateModalOpen(false);
        getPosts();
    }, [getPosts]);

    const handlePostCreateError = React.useCallback(() => {
        toast(ERROR_MESSAGE, { type: 'error' });
    }, []);

    const handlePostEditSuccess = React.useCallback(() => {
        toast('Post has been updated successfully...', { type: 'success' });
        setEditingPostId(undefined);
        getPosts();
    }, [getPosts]);

    const handlePostEditError = React.useCallback(() => {
        toast(ERROR_MESSAGE, { type: 'error' });
    }, []);

    return (
        <CommonPageContainer>
            <Row className="mt-3">
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                    <Button onClick={handleBackClick}>
                        <ArrowLeftCircle />
                    </Button>
                    <Button className="btn-success" onClick={handleCreateModalClick}>Create</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {renderBody()}
                </Col>
            </Row>
            <ToastContainer />
            <CreatePostModal
                onPostCreateSuccess={handlePostCreateSuccess}
                isOpen={isCreateModalOpen}
                toggle={toggleCreateModal}
                onPostCreateError={handlePostCreateError}
            />
            {!!editingPostId && (
                <EditPostModal
                    id={editingPostId}
                    isOpen={!!editingPostId}
                    toggle={() => setEditingPostId(undefined)}
                    onEditSuccess={handlePostEditSuccess}
                    onEditError={handlePostEditError}
                />
            )}
        </CommonPageContainer>
    )
}
