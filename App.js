import React from "react";
import { WebView, ActivityIndicator } from "react-native";
import { API_KEY, CLIENT_ID } from "./keys"
const parseString = require("react-native-xml2js").parseString;


export default class App extends React.Component {
  state = {
    url: "",
    loading: true
  };

  componentDidMount() {
    let apiToken = "";

    fetch(
      "https://int-sso.moneydesktop.com/"+CLIENT_ID+"/users/U-82530/urls/master_widget.xml",
      {
        method: "get",
        headers: {
          Accept: "application/vnd.moneydesktop.sso.v3+xml",
          "MD-API-KEY": API_KEY
        }
      }
    )
      .then(res => res.text())
      .then(
        result => {
          parseString(result, function(err, res) {
            console.log(res.url.url[0]);
            apiToken = res.url.url[0];
          });
          this.setState({
            url: apiToken,
            loading: false
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large"/>;
    }
    return (
      <WebView
        source={{
          uri: this.state.url
        }}
        startInLoadingState
        scalesPageToFit
        style={{ flex: 1, marginTop: 50 }}
      />
    );
  }

  render() {
    return this.renderButton();
  }
}

