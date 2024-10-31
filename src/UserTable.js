import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";

const UserTable = ({ rows, selectedUser, deleteUser }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows
              .filter((row) => row.id !== 0) // Filter out rows with id=0
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ margin: "0px 10px" }}
                      onClick={() =>
                        selectedUser({ id: row.id, name: row.name })
                      }
                    >
                      Update
                    </Button>
                    <Button
                      sx={{ margin: "0px 10px" }}
                      onClick={() => deleteUser({ id: row.id })}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" colSpan={3} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
