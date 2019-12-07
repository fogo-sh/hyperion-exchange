import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  GridList,
  GridListTile,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import CurrencyDetailsCard from "../components/CurrencyDetailsCard";

const useStyles = makeStyles(theme => ({
  page: {
    padding: "1rem"
  },
  
}));

const CurrenciesPage = () => {
  const classes = useStyles();
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/currencies");
      const respJson = await response.json();
      setCurrencies(respJson);
    })();
  }, []);

  return (
    <Grid
      container
      className={classes.page}
      spacing={2}
      cols={2}
      alignItems="stretch"
    >
      {currencies.map(currency => (
        <Grid item xs={12} sm={6} key={currency.shortCode}>
          <CurrencyDetailsCard currency={currency} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CurrenciesPage;
