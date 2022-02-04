import React, { Component } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./UserCard.css";

class UserCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imgUrl: props.imgurl,
      name: props.name,
      description: props.description,
      github: props.github, 
      linkedin: props.linkedin,
      instagram: props.instagram
    };
  }

  render() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="345"
          image= {this.state.imgUrl}
          alt="pfp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {this.state.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {this.state.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" href={"https://github.com/" + this.state.github}>GitHub</Button>
          <Button size="medium" href={"https://www.linkedin.com/in/" + this.state.linkedin}>Linkedin</Button>
          <Button size="medium" href={"https://www.instagram.com/" + this.state.instagram}>Instagram</Button>
        </CardActions>
      </Card>
    );
  }
}

export default UserCard;
