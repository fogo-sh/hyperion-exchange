import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
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

const useStyles = makeStyles(theme => ({
  page: {
    padding: "1rem"
  },
  card: {
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flex: 1
  }
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
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2">
                {currency.name}
              </Typography>
              <Typography color="textSecondary">
                {currency.shortCode}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={currency.site}>
                Balances
              </Button>
              {currency.site && (
                <Button size="small" href={currency.site}>
                  Currency Site
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CurrenciesPage;
