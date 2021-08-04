import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TwitterUser } from "./TwitterAuth";
// @ts-ignore
import ResizeImage from "react-resize-image";
// @ts-ignore
import ImageResize from "image-resize";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    width: 500,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
  media: {
    height: 500,
  },
});

function UserCard({ user }: { user: TwitterUser }) {
  const classes = useStyles();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      const imageResize = new ImageResize({
        format: "png",
        width: 500,
      });

      imageResize
        .play(user.profile_image_url.replace(/_normal\./, "."))
        .then((response: any) => {
          setImage(response);
        })
        .catch(function (error: any) {
          console.error(error);
        });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Card className={classes.root}>
      {image && (
        <CardMedia
          className={classes.media}
          image={image}
          title="Profile Picture"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          @{user.screen_name}
        </Typography>
        <Typography variant="body2" component="p">
          {user.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
