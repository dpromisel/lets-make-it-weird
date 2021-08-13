import React, { useContext } from "react";
import cx from "clsx";
// import Color from "color";
import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
// @ts-ignore
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { Row, Item } from "@mui-treasury/components/flex";
import { Link } from "@material-ui/core";
import { Tweet, TwitterUser } from "../../Twitter";
// @ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    overflow: "auto",
    [breakpoints.only("xs")]: {
      "& > *:not(:first-child)": {
        paddingLeft: 0,
      },
    },
    [breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles(({ palette }) => ({
  color: ({ color }: { color: string }) => ({
    "&:before": {
      backgroundColor: "grey",
    },
  }),
  root: {
    position: "relative",
    // borderRadius: "1rem",
    minWidth: 500,
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    // "&:hover": {
    //   "&:before": {
    //     bottom: -6,
    //   },
    //   "& $logo": {
    //     transform: "scale(1.1)",
    //     boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
    //   },
    // },
  },
  cover: {
    borderRadius: "1rem 1rem 0 0",
  },
  content: ({ color }: { color: string }) => ({
    position: "relative",
    zIndex: 1,
    borderRadius: "1rem",
    boxShadow: `0 6px 16px 0 grey`,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
      width: "100%",
      height: "100%",
      clipPath:
        "polygon(0% 100%, 0% 35%, 0.3% 33%, 1% 31%, 1.5% 30%, 2% 29%, 2.5% 28.4%, 3% 27.9%, 3.3% 27.6%, 5% 27%,95% 0%,100% 0%, 100% 100%)",
      borderRadius: "1rem",
      // background: `linear-gradient(to top, ${color}, ${Color(color)
      //   .rotate(24)
      //   .lighten(0.12)})`,
    },
  }),
  title: {
    fontFamily: "Fjalla One",
    fontSize: "1.25rem",
    color: "#fff",
    margin: 0,
  },
  logo: {
    transition: "0.3s",
    width: 300,
    height: "auto",
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.24)",
    borderRadius: "10rem",
  },
}));

const UserCard = ({ user }: { user: TwitterUser }) => {
  const mediaStyles = useCoverCardMediaStyles();
  const styles = useStyles({ color: "#fc7944" });

  if (!user) return null;
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        color: "black",
        maxWidth: 500,
      }}
      className={cx(styles.root)}
    >
      <GoogleFontLoader
        fonts={[{ font: "Fjalla One" }, { font: "Sen", weights: [500] }]}
      />
      <Box className={cx(styles.root, styles.color)} pt={20}>
        <CardMedia
          image={user.profile_banner_url}
          className={styles.cover}
          classes={mediaStyles}
        />
      </Box>
      <Box className={styles.content} p={2} style={{ marginTop: -150 }}>
        <Box position={"relative"} zIndex={1}>
          <Row p={0} gap={2} alignItems="center">
            <Item position="center">
              <Avatar
                className={styles.logo}
                src={user?.profile_image_url?.replace(/_normal\./, ".")}
              />
            </Item>
          </Row>
          <Row mt={1}>
            <Item position="center">
              <h2 className={styles.title} style={{ color: "black" }}>
                {user.name}
              </h2>
            </Item>
          </Row>
          <Row mt={1}>
            <Item position="center">
              <Link
                style={{ color: "grey" }}
                href={`https://twitter.com/${user.screen_name}`}
                target="_blank"
              >
                @{user.screen_name}
              </Link>
            </Item>
          </Row>
          <Row mt={2} alignItems={"center"}>
            <Item position="center">{user.description}</Item>
          </Row>
          <Row mt={2} alignItems={"center"}>
            <Item position="center">
              {user?.entities?.url?.urls?.length &&
                user.entities?.url.urls.map((url) => (
                  <Item position="center">
                    {" "}
                    <Link href={url.expanded_url}>
                      {" "}
                      {url.display_url}{" "}
                    </Link>{" "}
                  </Item>
                ))}
            </Item>
          </Row>
        </Box>
      </Box>
    </div>
  );
};

export default UserCard;
