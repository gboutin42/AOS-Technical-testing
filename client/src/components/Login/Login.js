import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

// création de la class Login
export class Login extends React.Component {
  state = {
	error:'',
    email: "",
    password: ""
  };
  // check avant envoi du formulaire
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
		this.setState({error: 'You need enter an Email.'});
      return;
    }
    if (!password || password.length === 0) {
		this.setState({error: 'You need enter a Password.'});
		return;
    }
    try {
		// envoi du formulaire
	  const response  = await API.login(email, password);
	  this.setState({error: ''});
	  // si il y a match dans la BDD avec emil et password retour status 200 et donc changement de page
	  if (response.status === 200)
     	window.location = "/dashboard";
    } catch (error) {
		// sinon afficher l'erreur rencontrer
		console.error("Status: " + error.response.status + "\nError: " + error.response.data.error);
		this.setState({error: error.response.data.error});
    }
  };
  // enregistrer et afficher chaque changement de touche
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  // affichage du formulaire de connexion
  render() {
    const { email, password, error } = this.state;
    return (
		<div className="Login">
		<h1 className="Erreur" >{error}</h1>
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