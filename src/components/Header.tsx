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
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../assets/bank_14277894.png";
import { useAuth } from "../routes/ProtectedRoute";
import { Link, useNavigate } from "react-router-dom";
import UserButton from "./UserButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart } from "../store/cartSlice/cartsSlice";
import { Badge, Modal } from "@mui/material";
import { getProfile } from "../store/user/userSlice";
import InitialStepper from "./InitialStepper";
const pages = ["Products", "Pricing", "Blogs"];
const settings = ["Profile", "Setting", "Logout"];

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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { allCarts } = useSelector((state: any) => state.cart);
  const { userProfile } = useSelector((state: any) => state.profile);
  const { loginData } = useSelector((state: any) => state.login);
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
    dispatch(getAllCart({ search: "", page: "1", limit: "10" }));
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
    <AppBar position="static" className="text-blue-500 bg-white">
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
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Button
                key={page}
                id={page}
                onClick={(e: any) => {
                  navigate(`${e?.target?.id.toLowerCase()}`);
                }}
                sx={{ my: 2, color: "text-blue-500", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {!auth ? (
            <Box sx={{ flexGrow: 0 }}>
              <div className="">
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
              <Box sx={{ flexGrow: 0 }} className="me-8">
                <UserButton
                  name="Cart"
                  setIcon={
                    <Badge
                      badgeContent={allCarts?.data?.length}
                      color="primary"
                      className="p-1"
                    >
                      {" "}
                      <ShoppingCartIcon />{" "}
                    </Badge>
                  }
                  action={() => {
                    navigate("/carts");
                  }}
                />
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                    <Avatar alt="Remy Sharp" src={userProfile?.profile_img} />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        id={setting}
                        onClick={(e: any) => {
                          if (e.target.id == "Logout") {
                            localStorage.removeItem("access_token");
                            navigate("/");
                          } else if (e.target.id == "Profile") {
                            navigate("/profile");
                          } else if (e.target.id == "Setting") {
                            navigate("/setting");
                          }
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
