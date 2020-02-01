import React from "react";
import { TableCell, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  tableCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  profilePicture: {
    marginRight: "1rem"
  }
}));

const UserTableCell = ({ username, discriminator, profilePicture }) => {
  const classes = useStyles();
  return (
    <TableCell className={classes.tableCell}>
      <Avatar
        className={classes.profilePicture}
        alt={`${username}#${discriminator}`}
        src={profilePicture}
      />
      <Typography variant="subtitle1">{username}</Typography>
      <Typography variant="caption" color="textSecondary">#{discriminator}</Typography>
    </TableCell>
  );
};

export default UserTableCell;
