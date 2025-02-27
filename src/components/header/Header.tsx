import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Modal } from "@mui/material";

import logo from "../../assets/app-logo.png";
import { useAuth } from "../../routes/ProtectedRoute";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/user/userSlice";
import InitialStepper from "../initialStepper/InitialStepper";
import { logout } from "../../utils/helpers";
import { AppDispatch, RootState } from "../../store/store";
import { pages, settings } from "./headerContent";
import { initialStepperContainerStyle } from "./headerStyle";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("access_token");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const isApproved = userProfile?.data?.isApproved;
    if (userProfile?.data?.isReadDocumentation == false || !isApproved) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [userProfile]);

  const handleInitialApis = async () => {
    await dispatch(getProfile());
  };

  React.useEffect(() => {
    if (token) {
      handleInitialApis();
    }
  }, [token]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let auth = useAuth();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#27445D", position: "fixed", top: 0, zIndex: 10 }}
    >
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-0"
      >
        <Box sx={initialStepperContainerStyle}>
          <InitialStepper
            onClose={() => {
              setOpen(false);
            }}
          />
        </Box>
      </Modal>
      <Container maxWidth="xxl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} width="50" height="50" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <div className="flex justify-center items-center">
              <img className="text-left" src={logo} width="50" height="50" />
            </div>
            {auth && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages[userProfile?.data?.role]?.map((page) => (
                <MenuItem
                  key={page}
                  onClick={(e: any) => {
                    navigate(`/${page}`);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {auth && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages[userProfile?.data?.role]?.map((page) => (
                <Button
                  key={page}
                  id={page}
                  onClick={(e: any) => {
                    navigate(`/${e?.target?.id.toLowerCase()}`);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
          {!auth ? (
            <Box sx={{ flexGrow: 0 }}>
              <div className="flex gap-4">
                <Link to="/">
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to="/sign-in">
                  <Button className="mx-4" variant="contained">
                    Signup
                  </Button>
                </Link>
              </div>
            </Box>
          ) : (
            <div className="flex ">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      className={"border-2 border-gray-200"}
                      sx={{ width: "2.5rem", height: "2.5rem" }}
                      alt="Remy Sharp"
                      src={userProfile?.data?.profile_img}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    sx={{
                      borderBottom: "1px solid #80808030",
                      display: "flex",
                      alignItems: "center",
                      paddingY: "0.5rem",
                    }}
                    key={setting.label}
                    onClick={handleCloseUserMenu}
                  >
                    {setting.icon}
                    <Typography
                      textAlign="center"
                      id={setting.label}
                      sx={{ width: "5rem" }}
                      onClick={(e: any) => {
                        if (e.target.id == "Logout") {
                          logout();
                        } else if (e.target.id == "Profile") {
                          navigate("/profile");
                        } else if (e.target.id == "Setting") {
                          navigate("/setting");
                        } else if (e.target.id == "Orders") {
                          navigate("/orders");
                        }
                      }}
                    >
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
