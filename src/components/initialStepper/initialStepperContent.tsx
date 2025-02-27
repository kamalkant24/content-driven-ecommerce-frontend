import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export const AccountTypes = [
  {
    title: "Personal Account",
    description:
      "This is user account. You can buy products, like and comment on blogs.",
    logo: <PermIdentityIcon height="200px" width="200px" />,
    role: "customer",
  },
  {
    title: "Corporate Account",
    description:
      "This is vendor account. You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
    logo: <CorporateFareIcon height="200px" width="200px" />,
    role: "vendor",
  },
];

export const steps = [
  {
    label: "Account Type",
    description: `Select your account type`,
  },
  {
    label: "Business Details",
    description: `Setup your business deatils`,
  },
  {
    label: "Completetd",
    description: `Your account is created`,
  },
];

export const industryTypes = [
  "Technology & Electronics",
  "Fashion & Apparel",
  "Home & Living",
  "Health & Wellness",
  "Sports & Recreation",
];
