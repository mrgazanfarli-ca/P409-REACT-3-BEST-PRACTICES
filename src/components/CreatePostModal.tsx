import React, { ChangeEvent } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

interface ICreatePostModalProps {
    isOpen: boolean;
    toggle: () => void;
    onPostCreateSuccess: () => void;
    onPostCreateError: () => void;
}

export interface ICreateModalFormData {
    title: string;
    body: string;
}

export const initialFormData: ICreateModalFormData = {
    title: '',
    body: ''
}

export enum EPostFormField {
    TITLE = 'title',
    BODY = 'body'
}

export const CreatePostModal: React.FC<ICreatePostModalProps> = (props) => {
    const [createPostData, setCreatePostData] = React.useState<ICreateModalFormData>(initialFormData);
    const [isCreateLoading, setCreateLoading] = React.useState(false);

    const handleInputChange = React.useCallback((type: EPostFormField, event: ChangeEvent<HTMLInputElement>) => {
        setCreatePostData(oldData => ({ ...oldData, [type]: event.target.value }));
    }, []);

    const handlePostCreate = React.useCallback(() => {
        setCreateLoading(true);
        axios.post('https://jsonplaceholder.typicode.com/posts', createPostData)
            .then(props.onPostCreateSuccess)
            .catch(props.onPostCreateError)
            .finally(() => {
            setCreateLoading(false);
        });
    }, [createPostData, props]);

    return (
        <Modal {...props} centered>
            <ModalHeader>Create post</ModalHeader>
            <ModalBody>
                <Input
                    value={createPostData.title}
                    placeholder="Post title"
                    onChange={(event) => handleInputChange(EPostFormField.TITLE, event)}
                    disabled={isCreateLoading}
                />
                <Input
                    value={createPostData.body}
                    className="mt-3"
                    placeholder="Post body"
                    onChange={(event) => handleInputChange(EPostFormField.BODY, event)}
                    disabled={isCreateLoading}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={isCreateLoading}
                    className="btn-success"
                    onClick={handlePostCreate}
                >
                    Create
                </Button>
            </ModalFooter>
        </Modal>
    )
}
