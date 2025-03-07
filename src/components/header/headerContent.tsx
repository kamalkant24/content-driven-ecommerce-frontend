import Person2Icon from "@mui/icons-material/Person2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export const settings = [
  { label: "Profile", icon: <Person2Icon sx={{ width: "20px" }} /> },
  {
    label: "Orders",
    icon: <ShoppingBagIcon sx={{ width: "20px" }} />,
    customerOnly: true,
  },
  { label: "Setting", icon: <SettingsIcon sx={{ width: "20px" }} /> },
  { label: "Logout", icon: <LogoutIcon sx={{ width: "20px" }} /> },
];

export const pages = {
  customer: ["Products", "Blogs", "Cart", "Wishlist"],
  vendor: ["Products", "Blogs"],
};
