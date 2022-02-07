import React, { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import UserCard from "../UserCard/UserCard"

const UserGrid = ({ cards } : any) => {

  return (
    <div className="user-grid">
      <Grid container 
          direction="row"
          spacing={3}>

        {cards.map((card: any, i: any) => (
          <Grid item xs={3} md={4} key = {i}>
            <UserCard {...card} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserGrid;
