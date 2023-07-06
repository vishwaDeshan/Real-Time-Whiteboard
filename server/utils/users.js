const users = [];

// add user to the list
const addUser = ({ name, userId, roomId, host, presenter }) => {
    const user = { name, userId, roomId, host, presenter };
    users.push(user);
    return users.filter((user) => user.roomId === roomId);
}

//remove the user from the list
const removeUser = (id) => {
    const index = users.findIndex(user => user.userId === id);
    if (index !== -1) {
        return users.slice(index, 1)[0];
    }
};

//geta user from the list
const getUser = (id) => {
    return users.find((user) => user.userId === id);
}

//get users from the room
const getUserInRoom = (roomId) => {
    return users.filter((user) => user.roomId === roomId);
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}