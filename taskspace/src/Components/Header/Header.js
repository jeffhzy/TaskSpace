import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchBar from "./SearchBar";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, signout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#a892ee" }} elevation={1}>
      <Container maxWidth="false">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "verdana",
              letterSpacing: ".1rem",
              color: "white !important",
              textDecoration: "none !important",
            }}
          >
            TASKSPACE
          </Typography>

          <Box sx={{ display: "flex" }}>
            <SearchBar />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  style={{ outline: "none" }}
                >
                  <MenuIcon sx={{ mt: "10px" }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  to={"/profile/" + user.uid}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                    <Typography
                      sx={{
                        textDecoration: "none !important",
                        color: "#484848 !important",
                      }}
                      textAlign="center"
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/account">
                  <MenuItem key="Account" onClick={handleCloseUserMenu}>
                    <Typography
                      sx={{
                        textDecoration: "none !important",
                        color: "#484848 !important",
                      }}
                      textAlign="center"
                    >
                      Account
                    </Typography>
                  </MenuItem>
                </Link>
                <MenuItem key="Log Out" onClick={signout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
