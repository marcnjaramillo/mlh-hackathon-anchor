import React, { useEffect, useState } from "react";

import "./UserGrid.css";

import Grid from '@mui/material/Grid';
import UserCard from "../UserCard/UserCard"

const UserGrid = (props) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(props.data);
  }, [props]);

  return (
    <div className="user-grid">
      <Grid container 
          direction="row"
          spacing={3}>

        {userList.map(user => (
          <Grid item xs={3} md={4}>
            <UserCard 
              imgurl={user.img}
              name={user.name}
              description={user.description}
              github={user.github}
              linkedin={user.linkedin}
              instagram={user.instagram}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserGrid;
