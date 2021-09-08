import React, { useState, useEffect } from 'react';
import Users from './Users.react';
import CreateUser from './CreateUser.react';

const UserWrapper = (props) => {
    const [showList, setShowList] = useState(true);
    const [selectedUser, setSelectedUser] = useState({});

    const render = showList ?
    <Users setSelectedUser={setSelectedUser} setShowList={setShowList} /> :
    <CreateUser selectedUser={selectedUser} setShowList={setShowList} />;

    return render;
}

export default UserWrapper;