// import auth0 from "auth0-js";
import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default class Auth0Service {
  constructor() {
    this.signin = this.signin.bind(this);
  }

  signin(username, password) {
    const reqObj = {
      email: username,
      password,
    };
    let url = process.env.REACT_APP_AUTH_SERVICE_BASE_URL + "login";
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
      reqObj,
      url
    )
      .then((response) => {
        if (
          !response.success ||
          response.responseCode !== 200 ||
          !response.responseData ||
          response.responseData.length === 0
        )
          return Promise.reject();
        return Promise.resolve(response.responseData);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }
}
