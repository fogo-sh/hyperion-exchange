import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel
} from "@material-ui/core";
import UserTableCell from "../components/UserTableCell";

const CurrencyPage = () => {
  const { shortCode } = useParams();
  const [balances, setBalances] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/api/currencies/${shortCode}`
      );
      setBalances(await response.json());
    })();
  }, [shortCode]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={true}
              direction={sortDirection}
              onClick={() => {
                setSortDirection(sortDirection === "desc" ? "asc" : "desc");
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
  );
};

export default CurrencyPage;
