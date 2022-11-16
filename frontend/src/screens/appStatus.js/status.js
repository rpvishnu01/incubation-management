import React, { useEffect } from "react";
import { Container, ProgressBar, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

function Status() {
  const info = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(async () => {
    let appData = await axios.get(`/api/users/status/${info._id}`);
    console.log("appdata", appData.data);
    setData(appData.data);
  }, []);

  return (
    <div>
      <div style={{ marginTop: "2%" }}>
        <Container>
          <Table hover size="sm">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>Application ID</th>
                <th>Company Name</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{obj._id}</td>
                    <td>{obj.companyName}</td>
                    <td>
                      {obj.status !== "REJECTED" ? (
                        <Table>
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>Pending</th>
                              <th style={{ textAlign: "center" }}>Accepted</th>
                              <th style={{ textAlign: "center" }}>Approved</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td colSpan={3}>
                                {obj.status !== "R" ? (
                                  <ProgressBar
                                    style={{ width: "45em" }}
                                    animated
                                    now={
                                      obj.status === "PENDING"
                                        ? 20
                                        : obj.status === "PROCESSING"
                                        ? 50
                                        : 100
                                    }
                                  />
                                ) : (
                                  <span>Rejected</span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      ) : (
                        <h5 style={{ color: "red", textAlign: "center" }}>
                          Rejected
                        </h5>
                      )}
                    </td>
                    <td>
                      <p
                        className="view"
                        style={{ color: "turquoise", textAlign: "center" }}
                        onClick={() => {
                          navigate("/userAppView");
                          localStorage.setItem(
                            "appId",
                            JSON.stringify([obj._id])
                          );
                        }}
                      >
                        View Application
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((obj) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
        </Container>
      </div>
    </div>
  );
}

export default Status;
