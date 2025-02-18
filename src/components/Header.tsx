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
import logo from "../assets/app-logo.png";
import { useAuth } from "../routes/ProtectedRoute";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { getProfile } from "../store/user/userSlice";
import InitialStepper from "./InitialStepper";
import { getFullProductUrl, logout } from "../utils/helpers";
import { RootState } from "../store/store";
import Person2Icon from '@mui/icons-material/Person2';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const settings = [{ label: "Profile", icon: <Person2Icon sx={{ width: '20px' }} /> }, { label: "Orders", icon: <ShoppingBagIcon sx={{ width: '20px' }} /> }, { label: "Setting", icon: <SettingsIcon sx={{ width: '20px' }} /> }, { label: "Logout", icon: <LogoutIcon sx={{ width: '20px' }} /> }];

function Header() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    boxShadow: 26,
    p: 0,
  };

  const pages = {
    user: ["Products", "Blogs", "Chat", "Cart"],
    vendor: ["Products", "Blogs", "Chat"]
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { allCarts } = useSelector((state: RootState) => state.cart);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const { loginData } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (userProfile?.isReadDocumentation == false) {
      setOpen(true);
    }
  }, [userProfile]);

  const handleInitialApis = async () => {
    await dispatch(getProfile({}));
  };

  React.useEffect(() => {
    if (token || loginData?.code == 200) {
      handleInitialApis();
    }
  }, [loginData]);

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
    <AppBar position="static" sx={{ backgroundColor: "#27445D", position: 'fixed', top: 0, zIndex: 10 }}>
      <Modal
        open={open}
        // onClose={}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-0"
      >
        <Box sx={style}>
          <InitialStepper
            onClose={() => {
              setOpen(false);
            }}
          />
        </Box>
      </Modal>
      <Container maxWidth="xxl" >
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            {auth && <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>}
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
              {pages[userProfile?.role]?.map((page) => (
                <MenuItem key={page} onClick={(e: any) => {
                  navigate(`/${page}`);
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {auth && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages[userProfile?.role]?.map((page) => (
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
          </Box>}
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
              {/* <Box sx={{ flexGrow: 0 }} className="flex">
            <UserButton
              styleClass="text-blue-500 "
              name="Cart"
              setIcon={
                <Badge
                  badgeContent={allCarts?.length}
                  color="warning"
                  className="p-1 text-blue-500"
                >
                  <ShoppingCartIcon />
                </Badge>
              }
              action={() => {
                navigate("/carts");
              }}
            />
          </Box> */}

              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar className={'border-2 border-gray-200'} sx={{ width: '3rem', height: '3rem' }} alt="Remy Sharp" src={getFullProductUrl(userProfile?.profile_img)} />
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
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem sx={{ borderBottom: '1px solid #80808030', display: 'flex', alignItems: 'center', paddingY: '0.5rem' }} key={setting.label} onClick={handleCloseUserMenu}>
                    {setting.icon}
                    <Typography
                      textAlign="center"
                      id={setting.label}
                      sx={{ width: '5rem' }}
                      onClick={(e: any) => {
                        if (e.target.id == "Logout") {
                          logout();
                          navigate('/')
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
