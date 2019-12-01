import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

const CurrenciesLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/" {...props} />
));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Hyperion
          </Typography>
          <Button color="inherit" component={CurrenciesLink}>
            Currencies
          </Button>
        </Toolbar>
      </AppBar>
    </Router>
  );
};

export default App;
