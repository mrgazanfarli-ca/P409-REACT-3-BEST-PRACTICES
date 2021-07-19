import React, { ChangeEvent } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IPost } from '../models';
import axios from 'axios';
import { EPostFormField, ICreateModalFormData, initialFormData } from '../components/CreatePostModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAsyncData } from '../hooks/useAsyncData';

interface IEditPostModalProps {
    isOpen: boolean;
    toggle: () => void;
    id: number;
    onEditSuccess?: () => void;
    onEditError?: () => void;
}

export const EditPostModal: React.FC<IEditPostModalProps> = ({ isOpen, toggle, id, onEditError, onEditSuccess }) => {
    const [postData] = useAsyncData<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const [editPostData, setEditPostData] = React.useState<ICreateModalFormData>(initialFormData);
    const [isEditLoading, setEditLoading] = React.useState(false);

    React.useEffect(() => {
        if (!!postData.data) {
            setEditPostData({ ...postData.data });
        }
    }, [postData]);

    const handleInputChange = React.useCallback((type: EPostFormField, event: ChangeEvent<HTMLInputElement>) => {
        setEditPostData(oldData => ({ ...oldData, [type]: event.target.value }));
    }, []);

    const renderBody = React.useCallback(() => {
        if (postData.loading) {
            return <LoadingSpinner />;
        } else if (postData.error) {
            return <h4 className="text-danger">Error occurred...</h4>;
        } else {
            return (
                <>
                    <Input
                        value={editPostData.title}
                        placeholder="Post title"
                        onChange={(event) => handleInputChange(EPostFormField.TITLE, event)}
                        disabled={isEditLoading}
                    />
                    <Input
                        value={editPostData.body}
                        className="mt-3"
                        placeholder="Post body"
                        onChange={(event) => handleInputChange(EPostFormField.BODY, event)}
                        disabled={isEditLoading}
                    />
                </>
            )
        }
    }, [editPostData.body, editPostData.title, handleInputChange, isEditLoading, postData.error, postData.loading]);

    const handleEditClick = React.useCallback(() => {
        if (Boolean(id)) {
            setEditLoading(true);
            axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, editPostData).then(() => {
                if (!!onEditSuccess) {
                    onEditSuccess();
                }
            }).catch(() => {
                if (!!onEditError) {
                    onEditError();
                }
            }).finally(() => {
                setEditLoading(false);
            });
        }
    }, [editPostData, id, onEditError, onEditSuccess]);

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>
                Edit post #{id}
            </ModalHeader>
            <ModalBody>
                {renderBody()}
            </ModalBody>
            <ModalFooter>
                <Button disabled={isEditLoading} className="btn-secondary" onClick={handleEditClick}>
                    Edit
                </Button>
            </ModalFooter>
        </Modal>
    )
}
