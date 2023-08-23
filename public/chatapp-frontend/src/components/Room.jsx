import React from "react";
import io from 'socket-io';
import {Route,Link} from 'react-router-dom'
import RoomPage from "./RoomPage";
const socket = io();
export default class Room extends React.Component{
    
    constructor(props){
        super();
        this.state={
            rooms:[],
            newRoom: ''
        };
    }
    componentDidMount()
    {
        socket.on('listRooms',(roomList)=>{
            this.setState({...this.state,rooms:roomList});
        });

    }
    createRoom=()=>{
        io.emit('joinRoom',
        {username:this.props.username,
            room:this.state.newRoom});
        this.setState({...this.state,newRoom:''});
        if(!this.state.rooms.some((room)=>{return room==newRoom})){
            this.setState({...this.state,room: [...this.state.room,newRoom]});
        }
    }
    joinRoom=(room)=>{
        socket.emit('joinRoom',{username:this.props.username,
            room:room
        });
    }
    render(){
        return(
        <React.Fragment>
            {this.state.rooms.map((room)=>{
                return (<div>
                        <p>{room}</p>
                        <Link to={`/room/${room}`} onClick={this.joinRoom(room)}/>
                        <Route exact path={`/room/${room}`} component={()=><RoomPage username={this.state.username} room={room}/>}></Route>
                    </div>)
            })}
            <div>
                <input type="text" value={this.state.newRoom} 
                onChange={
                    (ev)=>
                    this.setState({...this.state,newRoom:ev.target.value})
                    }/>
                <button onClick={this.createRoom()}>CREATE ROOM</button>
            </div>
        </React.Fragment>
        );
    }
}