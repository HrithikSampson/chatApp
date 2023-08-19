let autoIncrement = 0;
userList = [];
function addUser(socket,username,room) {
        let user;
        if(userList.some(username)){
                user = userList.filter((user)=>{return user.name===username})[0];
        }
        else{
                user = {
                        socketId:socket.id,
                        name: username,
                        id: autoIncrement++,
                        rooms: []
                }

        }
        user.rooms.push(room);
        userList.push(user);
        return user;
}
function getRoomList(username){
        let user;
        if(userList.some(username)){
                user = userList.filter((user)=>{return user.name===username})[0];
        }
        if(!user){
                return [];
        }
        return user.rooms;
}
function removeUserFromRoom(username,room){
let user;
        if(userList.some(username)){
                user = userList.filter((user)=>{return user.name===username})[0];
                user.rooms = user.rooms.filter((room1)=>{return room1!=room});
        }
}
module.exports = {addUser,getRoomList,removeUserFromRoom};