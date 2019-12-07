import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flex: 1
  }
}));

const CurrencyDetailsCard = ({ currency, shouldShowBalances = true }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {currency.name}
        </Typography>
        <Typography color="textSecondary">{currency.shortCode}</Typography>
      </CardContent>
      <CardActions>
        {shouldShowBalances && (
          <Button
            size="small"
            component={React.forwardRef((props, ref) => (
              <RouterLink
                innerRef={ref}
                to={`/currency/${currency.shortCode}`}
                {...props}
              />
            ))}
          >
            Balances
          </Button>
        )}
        {currency.site && (
          <Button size="small" href={currency.site}>
            Currency Site
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CurrencyDetailsCard;
