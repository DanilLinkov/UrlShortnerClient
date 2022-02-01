import { Grid, IconButton, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "10px",
      paddingBottom: "10px",
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  })
);

function Footer(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography>
            This is a personal project, check out more about this project and
            me:
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid>
            <IconButton>
              <Typography
                sx={{
                  border: "1px solid #51425A",
                  borderRadius: "50px",
                }}
                width="26px"
                fontWeight="bold"
              >
                CV
              </Typography>
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              onClick={() => window.open("https://github.com/DanilLinkov")}
            >
              <GitHubIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              onClick={() =>
                window.open("https://www.linkedin.com/in/danillinkov/")
              }
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton href="mailto:danil.linkov@gmail.com">
              <MailIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
