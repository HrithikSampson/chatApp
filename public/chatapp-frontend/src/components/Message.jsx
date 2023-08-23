import React from 'react';
export default class Message extends React.Component{
    constructor(){

    }
    render(){
        return(
            <div className='joinchat'>
                {this.props.children}
            </div>
        )
    }
}