import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles
} from "@material-ui/core";
import UserTableCell from "../components/UserTableCell";
import CurrencyDetailsCard from "../components/CurrencyDetailsCard";

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '1rem',
  },
}))

const CurrencyPage = () => {
  const classes = useStyles();
  const { shortCode } = useParams();
  const [balances, setBalances] = useState([]);
  const [details, setDetails] = useState({});
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/api/currencies/${shortCode}`
      );
      const respJson = await response.json();
      setBalances(respJson.balances);
      setDetails(respJson.currency);
    })();
  }, [shortCode]);

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item xs={12}>
        <CurrencyDetailsCard currency={details} shouldShowBalances={false} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Balances
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={true}
                      direction={sortDirection}
                      onClick={() => {
                        setSortDirection(
                          sortDirection === "desc" ? "asc" : "desc"
                        );
                      }}
                    >
                      Balance
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balances
                  .sort((a, b) =>
                    sortDirection === "asc"
                      ? a.balance - b.balance
                      : b.balance - a.balance
                  )
                  .map(balance => (
                    <TableRow key={balance.user}>
                      <UserTableCell {...balance.user} />
                      <TableCell align="right">{balance.balance}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CurrencyPage;
