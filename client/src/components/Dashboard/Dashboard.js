import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class Dashboard extends React.Component {
	// se deconnecter
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  // affichage page success après connection réussis
  render() {
    return (
      <div className="Dashboard">
        <h1>Success</h1>
        <Button onClick={this.disconnect} block bsSize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}