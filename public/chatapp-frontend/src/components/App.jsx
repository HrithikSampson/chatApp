import React from "react";
import Room from './Room.jsx';
import {Route,Switch,Link} from 'react-router-dom'
export default class App extends React.Component{
    constructor(){
        super();
        this.state = {
            username: ''
        }
    }
    changeUsername=(ev)=>{
        this.setState({username:ev.target.value});
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <input placeholder="username" name="username" type="text"
                    value={this.state.username} onChange={this.changeUsername()}/>
                    <Link to="/Room">Login</Link>
                    <Route exact path='/Room' component={()=><Room username={this.state.username}/>}/> 
                </div>
            </React.Fragment>
        )
    }
}