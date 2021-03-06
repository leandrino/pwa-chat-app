import React, { Component } from 'react';
import logo from "./logo.png"

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            toggle: false,
        }
    }
    componentDidMount(){
        let savedRoom = JSON.parse(localStorage.getItem('room'));
        if(savedRoom){
        this.setState({
            toggle:true
        })
    }

    }

    toggleFunc = () => {
        this.setState((prevState)=>{
            if(prevState.toggle){
                localStorage.clear();
            }else{
                this.props.rememberRoom()
            }
            return {
                toggle: !prevState.toggle
            }
        })
    }


    render() {

        const {universalChangeHandler, username, submitUsername, room} = this.props;
        console.log('in Lofgin',room)
        return (
            <div className='login-container'>
                <img src={logo} alt='the just chat logo, two floating chat bubbles'/> 
                <h1>Just Chat</h1>
                <div>
                    <h2>Enter Username</h2>
                    <input id="username" autoFocus={true} onKeyPress={(e)=> {if(e.key === "Enter") submitUsername()}} name="userNameSelection" placeholder='Username' onChange={(e)=> universalChangeHandler(e)} value={username} />
                    <div>
                        <input onKeyPress={(e)=> {if(e.key === "Enter") submitUsername()}} name="room" placeholder="room" onChange={(e)=> {
                            localStorage.clear();
                            this.setState({toggle: false})
                            universalChangeHandler(e)
                            }} value={room} />
                        <label >
                            <input type='checkbox' checked={this.state.toggle} onChange={this.toggleFunc}/>
                            remember room
                        </label>
                    </div>
                    <button onClick={submitUsername}><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span></button>
                </div>
            </div>
        );
    }
}