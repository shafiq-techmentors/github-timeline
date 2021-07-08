import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,

    backgroundColor: "#521d91",
    boxShadow:
      "0 48px 48px -32px rgb(23 16 159 / 20%), 0 96px 96px -64px rgb(23 16 159 / 40%)",
    color: "#fff",
  },

  title: {
    color: "#ff7b2b",
    fontWeight: "700",
    fontSize: "26px",
    padding: "0px 0px 10px 0px",
  },
  subTitle: {
    color: "#fdfefe",
  },
  pt1: {
    paddingTop: "20px",
  },
});

export const TimeLineDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    // console.log("data in details page....", location.state.data);
  }, [location]);
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ margin: "10px 20px" }}
      >
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                {location.state.data.name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ paddingBottom: "10px" }}
              >
                {location.state.data.description}
              </Typography>

              <Divider />

              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>URL:</strong>{" "}
                {location.state.data.html_url}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Forks Count: </strong>
                {location.state.data.forks_count}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Stars:</strong>{" "}
                {location.state.data.stargazers_count}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Created At:</strong>{" "}
                {location.state.data.created_at}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Language:</strong>{" "}
                {location.state.data.language}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Updated At:</strong>{" "}
                {location.state.data.updated_at}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Open Issues: </strong>
                {location.state.data.open_issues}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pt1}>
                <strong className={classes.subTitle}>Size:</strong>{" "}
                {location.state.data.size}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
