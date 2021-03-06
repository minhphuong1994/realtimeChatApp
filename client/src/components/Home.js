import React, { useState, useEffect} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const styles = {
  root: {
    height: "97vh",
  },
};

const Home = (props)=>{
  const { classes } = props;
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchConversations());   
    setIsLoggedIn(true);   
  },[user]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }



  const handleLogout = async () => {
    dispatch(logout(user.id));
    dispatch(clearOnLogout());
  };

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
}

export default withStyles(styles)(Home);
