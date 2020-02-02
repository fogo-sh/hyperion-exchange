import React from "react";
import { TableCell, Avatar, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  tableCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    wordWrap: "anywhere"
  },
  profilePicture: {
    marginRight: "1rem"
  }
}));

const UserTableCell = ({
  username,
  discriminator,
  profilePicture,
  loading = false
}) => {
  const classes = useStyles();
  return (
    <TableCell className={classes.tableCell}>
      {loading ? (
        <>
          <Skeleton
            variant="circle"
            className={classes.profilePicture}
            width={40}
            height={40}
          />
          <Skeleton variant="text" width={"100%"}/>
        </>
      ) : (
        <>
          <Avatar
            className={classes.profilePicture}
            alt={`${username}#${discriminator}`}
            src={profilePicture}
          />
          <Typography variant="subtitle1">{username}</Typography>
          <Typography variant="caption" color="textSecondary">
            #{discriminator}
          </Typography>
        </>
      )}
    </TableCell>
  );
};

export default UserTableCell;
