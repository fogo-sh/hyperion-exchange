import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const CurrencyPage = () => {
  const { shortCode } = useParams();
  const [balances, setBalances] = useState([]);

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
          <TableCell>Discord ID</TableCell>
          <TableCell align="right">Balance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {balances.map(balance => (
          <TableRow key={balance.user}>
            <TableCell>{balance.user}</TableCell>
            <TableCell align="right">{balance.balance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CurrencyPage;
