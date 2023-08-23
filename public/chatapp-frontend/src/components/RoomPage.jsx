import React from 'react';
import io from 'socket-io';
import JoinChat from './JoinChat';
import Message from './Message';
const socket = io();
export default class RoomPage extends React.Component{
    constructor(props){
        this.state = {
            message: '',
            participants: [],
            messageList: []
        }
    }
    componentDidMount(){
        this.setState({...this.state,participants:io.sockets.clients('chatroom1')})
        socket.on('joinchat',(msg)=>{
            this.setState({...this.state, messageList: [...this.state.messageList,['joinchat',msg]]});
        })
        socket.on('getMessage',(msg)=>{
            this.setState({...this.state, messageList: [...this.state.messageList,['getMessage',msg]]});
        });
    }
    sendMessage=()=>{
        socket.emit('sendMessage',{username: this.props.username,room:this.props.room,message: this.state.message})
    }
    render(){
        return(
        <React.Fragment>
            <div id = "chatbox">
                <div id="message-box">
                    {
                        this.state.messageList.map((messageBox)=>{
                            switch(messageBox[0]){
                                case 'joinchat':
                                    return (<JoinChat>{messageBox[1]}</JoinChat>)
                                case 'getMessage':
                                    return (<Message>{messageBox[1]}</Message>)
                            }
                            return <React.Fragment></React.Fragment>
                        })
                    }
                </div>
                <div id="sendtext">
                        <input name="message" type="text" id="usermsg"
                         value={this.state.message} onChange={(ev)=>this.setState({...this.state,message: ev.target.value})}/>
                        <button name="send" type="text" onClick={this.sendMessage()}/>
                </div>
            </div>
        </React.Fragment>
        )
    }
}