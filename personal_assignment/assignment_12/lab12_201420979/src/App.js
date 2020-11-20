import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {isLoggedIn: false, userName: ''};
  }

  handleLoginClick(e) {
    e.preventDefault();
    console.log(e);
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  handleChange(e) {
    e.preventDefault();
    //let userName = e.target.value;
    this.setState({
      userName: e.target.value
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userName = this.state.userName;
    let button;
    let input;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      input = <input type="text" value = {userName} onChange={this.handleChange} />;

      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (        
        <div className="App">
          <header className="App-header">
            <Greeting isLoggedIn={isLoggedIn} userName={userName}/>
            {input}
            {button}
          </header>
        </div>
    );
  }
}


function UserGreeting(props) {
  //console.log(props);
  const userName = props.userName;

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>
        Hello, {userName}!
      </h1>
    </div>
  );
}

function GuestGreeting(props) {
  return (
      <div>
          <h1>
            Who are you?
          </h1>
      </div>
      );
}

function Greeting(props) {

  const isLoggedIn = props.isLoggedIn;    
  const userName = props.userName;

  if (isLoggedIn) {
    return <UserGreeting userName={userName}/>;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      OK
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Return
    </button>
  );
}



export default App;
