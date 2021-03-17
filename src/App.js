import { makeStyles } from "@material-ui/core";
import "./styles.css";
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // margin: "20px 20px 20px 60px",
    // height: "100%",
    // width: "100%",
    padding: "5rem",
    maxHeight: "100vh",
    maxWidth: "100vw",
    overflow: "scroll",
    background:
      "transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box"
  },
  tableContainer: {
    backgroundColor: "#273D49CC",
    borderRadius: "0.5rem"
  },

  row: {
    backgroundColor: "#283A46"
  },

  cell: {
    color: "#dadada",
    fontWeight: "800",
    fontSize: "1rem",
    border: "none"
  },

  contentContainer: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#2F4451"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#283A46"
    }
  },
  content: {
    color: "#97A1A9",
    border: "none"
  },
  contentOdd: {}
}));

function App() {
  const classes = useStyles();

  //states
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const count = 20;

  useEffect(() => {
    console.log("fetching data now");
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`)
      .then((response) => response.json())
      .then((dataRecieved) => {
        setData((data) => [...data, ...dataRecieved]);
        setHasMore(true);
        console.log("data is fetched");
      })
      .catch((error) => console.log(error));
  }, [count, page]);

  const fetchMoreData = () => {
    setPage(page + 1);
    console.log(data);
    console.log("Now at Page:", page);
  };

  return (
    <div id="scrollableDiv" className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <InfiniteScroll
          dataLength={data.length}
          scrollableTarget="scrollableDiv"
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h1
              style={{ color: "#14AFF1", textAlign: "center", padding: "1rem" }}
            >
              Loading...
            </h1>
          }
        >
          <Table>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell align="left" className={classes.cell}>
                  ID{" "}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  Author{" "}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  Width
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  Height
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  Website Link
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  Image
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <TableRow key={i} className={classes.contentContainer}>
                  <TableCell align="left" className={classes.content}>
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.content}
                    style={{ color: "#FF5B5B" }}
                  >
                    {row.author}
                  </TableCell>
                  <TableCell align="left" className={classes.content}>
                    {row.width}
                  </TableCell>
                  <TableCell align="left" className={classes.content}>
                    {row.height}
                  </TableCell>
                  <TableCell align="left" className={classes.content}>
                    {row.url}
                  </TableCell>
                  <TableCell align="left" className={classes.content}>
                    <a href={row.download_url} style={{ color: "#14AFF1" }}>
                      {row.download_url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
}

export default App;
