import React from 'react';

interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: UserProps[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>{user.name} - {user.email}</li>
    ))}
  </ul>
);

export default UserList;
