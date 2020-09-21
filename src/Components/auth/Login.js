import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, {signInWithGoogle} from "../../util/Firebase.js";
import { AuthContext } from "../../util/Auth.js";

import Typography from '@material-ui/core/Typography'
import { Button, Grid } from "@material-ui/core";

const Login = ({ history }) => {
  // const handleLogin = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     const { email, password } = event.target.elements;
  //     try {
  //       await app
  //         .auth()
  //         .signInWithEmailAndPassword(email.value, password.value);
  //       history.push("/");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   },
  //   [history]
  // );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={"/ElectionsMonitoringForms/" + window.location.search} />;
  }

  return (
    <div>
      <Typography align="center" variant="h4">Войти с помощью аккаунта Google</Typography>
      <Grid container justify="center" style={{marginTop: 20}}><Button variant="contained" onClick={signInWithGoogle}>Sign-in with Google</Button></Grid>
      {/* <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form> */}
    </div>
  );
};



export default withRouter(Login);
