import React from 'react';
import { IUser } from '../models';
import { Link } from 'react-router-dom';

interface IUsersListProps {
    users: IUser[];
}

export const UsersList: React.FC<IUsersListProps> = ({ users }) => {
    return <>
        {users.map(({ id, email, company: { name: companyName }, name }) => (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{companyName}</td>
                <td>
                    <Link to={`/users/${id}/posts`} className="btn btn-primary">See posts</Link>
                </td>
            </tr>
        ))}
    </>;
}
