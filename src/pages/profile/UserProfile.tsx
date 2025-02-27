import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Container,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store/store";
import { editUserSlice, getProfile } from "../../store/user/userSlice";

interface EditDetails {
  name: string;
  email: string;
  phone: string;
  org_Name: string;
  industry: string;
  org_Size: string;
  profile_img: string;
  banner: string;
  description: string;
  address: string;
}

const UserProfile = () => {
  const { userProfile, loading } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<EditDetails>({
    name: "",
    email: "",
    phone: "",
    org_Name: "",
    industry: "",
    org_Size: "",
    profile_img: "",
    banner: "",
    description: "",
    address: "",
  });
  const [editProfileInput, setEditProfileInput] = useState(false);
  const [newImageFile, setNewImageFile] = useState<string>("");
  const [editBannerInput, setEditBannerInput] = useState(false);
  const [newBannerFile, setNewBannerFile] = useState<string>("");
  const roleFields = {
    vendor: Object.keys(editDetails),
    customer: ["name", "email", "phone", "address", "profile_img"],
  };

  useEffect(() => {
    setEditDetails({
      name: userProfile?.data?.name,
      email: userProfile?.data?.email,
      org_Name: userProfile?.data?.org_Name,
      industry: userProfile?.data?.industry || "",
      org_Size: userProfile?.data?.org_Size,
      phone: userProfile?.data?.phone,
      description: userProfile?.data?.description,
      address: userProfile?.data?.address,
      profile_img: userProfile?.data?.profile_img,
      banner: userProfile?.data?.banner,
    });
  }, [editMode, userProfile]);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const cancelEdit = () => setEditMode(false);

  const handleProfilePicUpload = (e: any) => {
    const imageFile = e.target.files[0];
    setNewImageFile(imageFile);
    const url = URL.createObjectURL(imageFile);
    setEditDetails({ ...editDetails, profile_img: url });
    setEditProfileInput(false);
  };

  const handleBannerUpload = (e: any) => {
    const imageFile = e.target.files[0];
    setNewBannerFile(imageFile);
    const url = URL.createObjectURL(imageFile);
    setEditDetails({ ...editDetails, banner: url });
    setEditBannerInput(false);
  };

  const handleEditInputChange = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;
    setEditDetails({ ...editDetails, [field]: value });
  };

  const validate = () => {
    const fieldMessageName = {
      org_Name: "Organization Name",
      industry: "Industry",
      org_Size: "Organization Size",
      profile_img: "Avatar",
      banner: "Banner",
      address: "Address",
      description: "Description",
      phone: "Phone Number",
      name: "Full Name",
      email: "Email",
    };
    for (const field in editDetails) {
      if (!editDetails[field as keyof EditDetails]) {
        const role = userProfile?.data?.role as keyof typeof roleFields;
        if (roleFields[role]?.includes(field)) {
          toast.warning(`${fieldMessageName[field]} is required.`);
          return false;
        }
      }
    }
    return true;
  };

  const editProfile = async () => {
    const isValidateSeccess = validate();
    if (isValidateSeccess) {
      const updatedDetails: any = {};
      for (const field in editDetails) {
        if (
          editDetails[field as keyof EditDetails] !==
          userProfile?.data?.[field as keyof EditDetails]
        ) {
          updatedDetails[field] = editDetails[field as keyof EditDetails];
        }
      }
      if (updatedDetails?.profile_img) {
        updatedDetails.logo = newImageFile;
      }
      if (updatedDetails?.banner) {
        updatedDetails.banner = newBannerFile;
      }
      if (Object.keys(updatedDetails).length > 0) {
        const res = await dispatch(
          editUserSlice({ ...updatedDetails, email: userProfile?.data?.email })
        );
        if (res.type === "put/editUserProfile/fulfilled") {
          await dispatch(getProfile());
        }
      }
      setEditMode(false);
    }
  };

  if (loading === "pending") {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container maxWidth="md" className="my-4">
      {!editMode && (
        <Box
          className="flex flex-col mb-4 p-4"
          sx={{ borderRadius: 2, boxShadow: 3 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              alt="Profile Image"
              src={userProfile?.data?.profile_img}
              className="border-2 border-gray-300 shadow-md"
              sx={{ width: 60, height: 60 }}
            />
            <Box className="capitalize">
              <Typography variant="h6">{userProfile?.data?.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userProfile?.data?.org_Name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userProfile?.data?.role}
              </Typography>
            </Box>
          </Box>
          {userProfile?.data?.role === "vendor" && (
            <Box mt={2}>
              <img
                src={editDetails?.banner}
                alt="Banner"
                className="max-h-[6rem] max-w-[100%] contain"
              />
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ borderRadius: 2, boxShadow: 3, padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">
            {editMode ? "Edit" : ""} Profile Information
          </Typography>
          {!editMode && (
            <MdEdit
              className="text-green-600 cursor-pointer"
              onClick={handleEditProfile}
            />
          )}
        </Box>

        <hr style={{ margin: "1rem 0" }} />

        <Typography variant="subtitle1" marginBottom={2}>
          User Details
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box flex="1 1 48%">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={editDetails?.name}
              name="name"
              onChange={handleEditInputChange}
              disabled={!editMode}
            />
          </Box>
          <Box flex="1 1 48%">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={editDetails?.email}
              name="email"
              onChange={handleEditInputChange}
              disabled
            />
          </Box>
        </Box>
        {userProfile?.data?.role === "vendor" && (
          <>
            <hr style={{ margin: "1rem 0" }} />
            <Typography variant="subtitle1" marginBottom={2}>
              Organization Details
            </Typography>
          </>
        )}

        <Box marginTop={2} display="flex" flexWrap="wrap" gap={2}>
          {userProfile?.data?.role === "vendor" && (
            <>
              <Box flex="1 1 48%">
                <TextField
                  label="Organization Name"
                  variant="outlined"
                  fullWidth
                  value={editDetails?.org_Name}
                  name="org_Name"
                  onChange={handleEditInputChange}
                  disabled={!editMode}
                />
              </Box>
              <Box flex="1 1 48%">
                <FormControl fullWidth variant="outlined" disabled={!editMode}>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={editDetails?.industry}
                    name="industry"
                    onChange={handleEditInputChange}
                    label="Industry"
                  >
                    <MenuItem value="Technology & Electronics">
                      Technology & Electronics
                    </MenuItem>
                    <MenuItem value="Fashion & Apparel">
                      Fashion & Apparel
                    </MenuItem>
                    <MenuItem value="Home & Living">Home & Living</MenuItem>
                    <MenuItem value="Health & Wellness">
                      Health & Wellness
                    </MenuItem>
                    <MenuItem value="Sports & Recreation">
                      Sports & Recreation
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box flex="1 1 48%">
                <TextField
                  label="Organization Size"
                  variant="outlined"
                  fullWidth
                  value={editDetails?.org_Size}
                  name="org_Size"
                  onChange={handleEditInputChange}
                  disabled={!editMode}
                  type="number"
                />
              </Box>
            </>
          )}
          <Box flex="1 1 48%">
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              value={editDetails?.phone}
              name="phone"
              type="number"
              onChange={handleEditInputChange}
              disabled={!editMode}
            />
          </Box>
          {userProfile?.data?.role === "vendor" && (
            <Box flex="1 1 100%">
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={editDetails?.description}
                name="description"
                onChange={handleEditInputChange}
                disabled={!editMode}
              />
            </Box>
          )}
          <Box flex="1 1 100%">
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={editDetails?.address}
              name="address"
              onChange={handleEditInputChange}
              disabled={!editMode}
            />
          </Box>
        </Box>

        <hr style={{ margin: "1rem 0" }} />

        {editMode && (
          <div className="my-4">
            <Typography variant="subtitle1" gutterBottom>
              Upload {userProfile?.data?.role === "vendor" ? "Logo" : "Avatar"}
            </Typography>
            <Box className="flex gap-2">
              {editProfileInput ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                />
              ) : (
                <>
                  <img
                    src={editDetails?.profile_img}
                    alt="Profile Image"
                    style={{ height: "3rem", maxWidth: "90%" }}
                  />
                  <RxCross1
                    className="cursor-pointer"
                    onClick={() => {
                      setEditProfileInput(true);
                      setEditDetails({ ...editDetails, profile_img: "" });
                    }}
                  />
                </>
              )}
            </Box>
          </div>
        )}
        {(editMode && userProfile?.data?.role) === "vendor" && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Upload Organization Banner
            </Typography>
            <Box className="flex gap-2">
              {editBannerInput ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                />
              ) : (
                <>
                  <img
                    src={editDetails?.banner}
                    alt="Banner"
                    style={{ height: "3rem", maxWidth: "90%" }}
                  />
                  <RxCross1
                    onClick={() => {
                      setEditBannerInput(true);
                      setEditDetails({ ...editDetails, banner: "" });
                    }}
                  />
                </>
              )}
            </Box>
          </>
        )}
        {editMode && (
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}
          >
            <Button
              sx={{ width: "20%", minWidth: "6rem" }}
              variant="contained"
              onClick={editProfile}
            >
              Save
            </Button>
            <Button
              sx={{ width: "20%", minWidth: "6rem" }}
              variant="outlined"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
