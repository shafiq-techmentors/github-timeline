import React, { useState } from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BackgroundImage from "../../assets/images/background-1.jpeg";
import logo from "../../assets/images/GitHub-logo.png";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { useHistory } from "react-router-dom";
import useInfiniteScroll from "../../components/infiniteScroll";
import Notification from "../../components/notification";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "2vw",
    paddingBottom: "11vw",
  },

  cssLabel: {
    color: "#FEECE8",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#fff",
    color: "#FEECE8",
  },
  secTypography: {
    textAlign: "center",
    color: "#fff",
  },
  btnSubmit: {
    color: "#000",
    fontWeight: "bold",
    borderColor: "#FFC300",
    background: "#FFC300",
    height: "50px",
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const TimeLine = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [copyData, SetCopyData] = useState([]);
  const [username, setUsername] = useState("");
  // const [repository, setRepository] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentArray, setCurrentArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // console.log("selectedDate", selectedDate);
  function fetchMoreListItems() {
    if (currentArray.length) handleSubmit(page);
  }
  const changeHandler = (e) => {
    setUsername(e.target.value);
  };

  const onFilterDate = () => {
    var result = [];
    copyData.filter((itm) => {
      var searchDate = new Date(itm.created_at);
      var currentDate = new Date(selectedDate);
      var searchDateMonth = searchDate.getUTCMonth() + 1;
      var searchDateYear = searchDate.getUTCFullYear();
      var currentDateMonth = currentDate.getUTCMonth() + 1;
      var currentDateYear = currentDate.getUTCFullYear();
      if (
        searchDateYear === currentDateYear &&
        searchDateMonth === currentDateMonth
      ) {
        result.push(itm);
      }
    });
    setData(result);
  };
  const handleSubmit = async (currentPage) => {
    setLoading(true);
    const repo = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${10}&page=${currentPage}`
    );
    const repoJson = await repo.json();
    setCurrentArray(repoJson);
    if (repo.status === 200) {
      setPage(page + 1);
      if (currentPage === 0) {
        setData(repoJson);
        SetCopyData(repoJson);
      } else {
        setData([...data, ...repoJson]);
        SetCopyData([...data, ...repoJson]);
      }
    } else {
      setNotify({
        isOpen: true,
        message: repoJson.message,
        type: "error",
      });
    }
    setIsFetching(false);
    setLoading(false);
  };

  // const handleRepository = () => history.push("/timeline-details");
  const handleRepository = (data) => {
    // console.log("data........", data);
    history.push({
      pathname: "/timeline-details",
      state: { data: data },
    });
  };

  const getModules = () => {
    return (
      data &&
      data.map((d, i) => {
        const className =
          i % 2 === 0 ? "custom-even-class" : "custom-odd-class";
        return (
          <TimelineItem classes={{ alignAlternate: className }} key={i}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent onClick={() => handleRepository(d)}>
              {d.html_url}
            </TimelineContent>
          </TimelineItem>
        );
      })
    );
  };

  return (
    <>
      <div className={classes.root}>
        <Notification notify={notify} setNotify={setNotify} />
        <Grid container>
          <Grid item xs={12}>
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              width="100px"
              style={{ marginLeft: "100px" }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <h1 className={classes.secTypography}>
              Want to see the GitHub timeline of other users?
            </h1>
            <p className={classes.secTypography}>
              You can see the whole timeline, just by typing in the user name!
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ marginTop: "100px" }}>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Search Timeline"
              variant="outlined"
              value={username}
              onChange={changeHandler}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssLabel,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.notchedOutline,
                  focused: classes.notchedOutline,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnSubmit}
              onClick={() => {
                setPage(0);
                handleSubmit(0);
              }}
              type="submit"
            >
              Generate Timeline
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: "100px" }}>
          <Grid item xs={3}></Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="Year and Month"
                helperText="Start from year selection"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnSubmit}
              onClick={() => {
                onFilterDate();
              }}
              type="submit"
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </div>
      {data && data.length ? (
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <h1 style={{ textAlign: "center", color: "#812bea" }}>
              @{data && data[0]?.owner.login} Timeline
            </h1>
            <Timeline align="alternate">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent></TimelineContent>
              </TimelineItem>

              {getModules()}
              {loading && <h1>Loading...</h1>}
            </Timeline>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};
