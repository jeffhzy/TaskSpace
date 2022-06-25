import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TaskMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = props.id;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTaskHandler = () => {
    props.deleteHandler({id});
  }

  return (
    <div>
      <MoreVertIcon onClick={handleClick} style={{cursor:'pointer'}}/>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={props.editHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteTaskHandler}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default TaskMenu;