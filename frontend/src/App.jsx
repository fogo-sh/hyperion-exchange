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
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import CurrenciesPage from "./pages/CurrenciesPage";
import { red } from "@material-ui/core/colors";
import CurrencyPage from "./pages/CurrencyPage";

const theme = createMuiTheme({
  palette: {
    primary: red
  }
});

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
      <ThemeProvider theme={theme}>
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

        <Switch>
          <Route path="/currency/:shortCode">
            <CurrencyPage />
          </Route>
          <Route path="/">
            <CurrenciesPage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
