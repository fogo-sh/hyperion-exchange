import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Tooltip
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { amber, green } from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flex: 1
  },
  cardTags: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  tagWarning: {
    background: amber[300]
  },
  tagGood: {
    background: green[300]
  }
}));

const TAGS = {
  "read-only": {
    className: "tagWarning",
    tooltip:
      "This currency has implemented a limited subset of APIs required by Hyperion. " +
      "Available functionality will be limited."
  },
  "read-write": {
    className: "tagGood",
    tooltip:
      "This currency has implemented all APIs required for full Hyperion functionality."
  },
  "no-payouts": {
    tooltip: "This currency has no scheduled payouts available to users."
  },
  "daily-payouts": {
    tooltip: "This currency has a daily allotted payout available to each user."
  }
};

const CurrencyDetailsCard = ({ currency, shouldShowBalances = true }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {currency ? currency.name : <Skeleton variant="text" />}
        </Typography>
        <Typography color="textSecondary">
          {currency ? currency.shortCode : <Skeleton variant="text" />}
        </Typography>
        <div className={classes.cardTags}>
          {currency && currency.tags &&
            currency.tags.map(tag => (
              <Tooltip title={TAGS[tag].tooltip} arrow>
                <Chip
                  label={tag}
                  className={classes[TAGS[tag].className]}
                  size="small"
                />
              </Tooltip>
            ))}
        </div>
      </CardContent>
      <CardActions>
        {currency && shouldShowBalances && (
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
        {!currency && (
          <Button size="small"><Skeleton variant="text" width={120}/></Button>
        )}
        {currency && currency.site && (
          <Button size="small" href={currency.site}>
            Currency Site
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CurrencyDetailsCard;
