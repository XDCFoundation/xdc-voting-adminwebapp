// import auth0 from "auth0-js";
import auth0 from 'auth0-js';


export default class Auth0Service {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    redirectUri:process.env.REACT_APP_AUTH0_REDIRECT_URI,
    scope: process.env.REACT_APP_AUTH0_SCOPE,
    responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
    grantType: "password"
  });

  constructor() {
    this.signin = this.signin.bind(this);
  }

  signin(username, password) {
      console.log(username,"username");
    let _this = this;
    return new Promise((resolve, reject) => {
      this.auth0.client.login(
        { realm:"Username-Password-Authentication", username, password },
        function (err, authResult) {
          if (err) {
              console.log(err,"er-=-4y498324u2-4")
            return reject(err);
          }
          // setSession(authResult);
          _this.auth0.client.userInfo(
            authResult.accessToken,
            async (err, user) => {
              if (err) {
                return reject(err);
              }
              return resolve({
                ...authResult,
                userDetails: user,
                userMetaData: user,
              });
            }
          );
        }
      );
    });
  }
}

