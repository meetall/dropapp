import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Progress from "./Progress.js";

const AppDrawerAuth = ({
  notAuthenticated,
  loading,
  user,
  profile,
  onSignOut,
  onPasswordChange,
  onClose
}) => {
  if (loading) {
    return <Progress />;
  } else if (notAuthenticated) {
    return null;
  }

  const { email } = user.data;
  const { name, organization } = profile.data;

  return (
    <List>
      <ListItem>
        <ListItemText secondary={`Signed in as ${name ? name : email}`} />
      </ListItem>
      <ListItem>
        <ListItemText secondary={`Organization: ${organization.name}`} />
      </ListItem>
      <ListItem component={Link} to="/invite" onClick={onClose} button>
        <ListItemText primary="Invite people" />
      </ListItem>
      <ListItem component={Link} to="/password" onClick={onClose} button>
        <ListItemText primary="Change password" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Sign out" onClick={onSignOut} />
      </ListItem>
    </List>
  );
};

AppDrawerAuth.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  profile: PropTypes.object,
  onSignOut: PropTypes.func,
  onClose: PropTypes.func
};

export default AppDrawerAuth;
