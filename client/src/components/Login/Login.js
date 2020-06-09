import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {
  state = {
	error:'',
    email: "",
    password: ""
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(email, password);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
		<div className="Login">
		<h1 className="Erreur">{this.state.error}</h1>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
      </div>
    );
  }
}