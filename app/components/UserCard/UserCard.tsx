import React, { FC } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CardProps {
  imageUrl: string
  name: string
  description: string
  github: string
  linkedin: string
  instagram: string
}

const UserCard: FC<CardProps> = ({imageUrl, name, description, github, linkedin, instagram}) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="345"
          image={imageUrl}
          alt="pfp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" href={"https://github.com/" + github}>GitHub</Button>
          <Button size="medium" href={"https://www.linkedin.com/in/" + linkedin}>Linkedin</Button>
          <Button size="medium" href={"https://www.instagram.com/" + instagram}>Instagram</Button>
        </CardActions>
      </Card>
    );
}

export default UserCard;
