import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StarRating } from "components/atoms/StarRating";
import { styled } from "styled-components";

export default function MuiTable({ reviewList }) {
  function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  return (
    <TableContainer component={StyledPaper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {reviewList.map((review) => (
            <TableRow key={review.nickname}>
              <TableCell component="th" scope="row">
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ fontSize: "20px" }}>
                      <b>{review.nickname}. </b>
                    </p>
                    <p>{formatDate(new Date(review.createdAt))}</p>
                  </div>
                  <StarRating
                    star={Math.round(Number(review.rating))}
                    rating={review.rating}
                    size="30px"
                  />
                </div>
                <hr style={{ marginTop: "15px" }} />
                <div>
                  {/* <p style={{ fontSize: "20px" }}>{review.content}</p> */}


                  <p style={{ fontSize: "20px" }} dangerouslySetInnerHTML={{ __html: review.content }}></p>

                  {/* <div dangerouslySetInnerHTML={{ __html: selectedNotice?.content }} /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const StyledPaper = styled(Paper)`
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;
