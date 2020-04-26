import { Redirect } from "react-router";

// TODO: Use component again
import React, { Component } from "react";
import { Button } from "@wfp/ui";

export default class ButtonRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.props.to} />;
    }

    const { to, ...other } = this.props;

    return <Button onClick={this.handleOnClick} type="button" {...other} />;
  }
}
