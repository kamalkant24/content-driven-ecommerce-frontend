import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { capitalize, createTheme, ThemeProvider } from "@mui/material";
import banner from '../../assets/banner-shoes.jpg';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, Avatar } from "@mui/material";

const UserProfile = () => {
    const { userProfile } = useSelector((state: any) => state.profile);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editDetails, setEditDetails] = useState({
        name: '',
        email: '',
        phone: '',
        org_Name: '',
        industry: '',
        org_Size: '',
        profile_img: '',
        org_Banner: '',
        org_Description: '',
        org_Address: '',
    });

    useEffect(() => {
        setEditDetails({
            name: userProfile?.name,
            email: userProfile?.email,
            phone: '123456789',
            org_Name: userProfile?.org_Name,
            industry: userProfile?.industry,
            org_Size: userProfile?.org_Size,
            profile_img: userProfile?.profile_img,
            org_Banner: banner,
            org_Address: '1234 Fashion Ave, Suite 567, New York, NY 10001, USA',
            org_Description: 'Shoes Mart is a leading footwear retailer that offers a wide selection of shoes from global brands.'
        });
    }, [editMode, userProfile]);

    const [editProfileInput, setEditProfileInput] = useState(false);
    const [newImageFile, setNewImageFile] = useState<string>('');
    const [editBannerInput, setEditBannerInput] = useState(false);
    const [newBannerFile, setNewBannerFile] = useState<string>('');
    const [isErrorPresent, setIsErrorPresent] = useState<boolean>(true);

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
        setEditDetails({ ...editDetails, org_Banner: url });
        setEditBannerInput(false);
    };

    const handleEditInputChange = (e: any) => {
        const field = e.target.name;
        const value = e.target.value;
        setEditDetails({ ...editDetails, [field]: value });
    };

    const validate = () => {
        for (const field in editDetails) {
            if (!editDetails[field]) {
                toast.warning(`${capitalize(field)} is required.`);
                return;
            }
        }
        setIsErrorPresent(false);
    };

    const editProfile = () => {
        setIsErrorPresent(true);
        validate();
        if (!isErrorPresent) {
            const updatedDetails = {};
            for (const field in editDetails) {
                if (editDetails[field] !== userProfile[field]) {
                    updatedDetails[field] = editDetails[field];
                }
            }
            if (updatedDetails?.profile_img) {
                console.log('image updated successfully', newImageFile);
                updatedDetails.profile_img = newImageFile;
            }
            if (Object.keys(updatedDetails).length > 0) {
                console.log(`Edit Details: `, updatedDetails);
            } else {
                setEditMode(false);
            }
        }
    };

    return (
        <Box className="max-w-[50rem] p-4 m-auto">
            {!editMode && (
                <Box className="flex flex-col mb-4 p-4" sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            alt="Profile Image"
                            src={userProfile?.profile_img}
                            className="border-2 border-gray-300 shadow-md"
                            sx={{ width: 60, height: 60 }}
                        />
                        <Box>
                            <Typography variant="h6">{userProfile?.name}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">{userProfile?.org_Name}</Typography>
                            <Typography variant="body2" color="text.secondary">Vendor</Typography>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <img src={editDetails?.org_Banner} alt="Banner" className="max-h-[6rem] max-w-[100%] contain" />
                    </Box>
                </Box>
            )}

            <Box sx={{ borderRadius: 2, boxShadow: 3, padding: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">{editMode ? 'Edit' : ''} Profile Information</Typography>
                    {!editMode && <MdEdit className="text-green-600 cursor-pointer" onClick={handleEditProfile} />}
                </Box>

                <hr style={{ margin: '1rem 0' }} />

                <Typography variant="subtitle1" marginBottom={2}>User Details</Typography>
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

                <hr style={{ margin: '1rem 0' }} />

                <Typography variant="subtitle1" marginBottom={2}>Organization Details</Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
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
                                <MenuItem value="Technology & Electronics">Technology & Electronics</MenuItem>
                                <MenuItem value="Fashion & Apparel">Fashion & Apparel</MenuItem>
                                <MenuItem value="Home & Living">Home & Living</MenuItem>
                                <MenuItem value="Health & Wellness">Health & Wellness</MenuItem>
                                <MenuItem value="Sports & Recreation">Sports & Recreation</MenuItem>
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
                        />
                    </Box>
                    <Box flex="1 1 48%">
                        <TextField
                            label="Mobile"
                            variant="outlined"
                            fullWidth
                            value={editDetails?.phone}
                            name="phone"
                            onChange={handleEditInputChange}
                            disabled={!editMode}
                        />
                    </Box>
                    <Box flex="1 1 100%">
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={editDetails?.org_Description}
                            name="org_Description"
                            onChange={handleEditInputChange}
                            disabled={!editMode}
                        />
                    </Box>
                    <Box flex="1 1 100%">
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={editDetails?.org_Address}
                            name="org_Address"
                            onChange={handleEditInputChange}
                            disabled={!editMode}
                        />
                    </Box>
                </Box>

                <hr style={{ margin: '1rem 0' }} />

                {editMode && (
                    <div className="my-4">
                        <Typography variant="subtitle1" gutterBottom>Upload Organization Logo</Typography>
                        <Box className="flex gap-2">
                            {editProfileInput ? (
                                <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
                            ) : (
                                <img src={editDetails?.profile_img} alt="Profile Image" style={{ height: '3rem', maxWidth: '90%' }} />
                            )}
                            <RxCross1 onClick={() => { setEditProfileInput(true); setEditDetails({ ...editDetails, profile_img: '' }); }} />
                        </Box>
                    </div>
                )}
                    
                {editMode && (
                    <>
                        <Typography variant="subtitle1" gutterBottom>Upload Organization Banner</Typography>
                        <Box className="flex gap-2">
                            {editBannerInput ? (
                                <input type="file" accept="image/*" onChange={handleBannerUpload} />
                            ) : (
                                <img src={editDetails?.org_Banner} alt="Banner" style={{ height: '3rem', maxWidth: '90%' }} />
                            )}
                            <RxCross1 onClick={() => { setEditBannerInput(true); setEditDetails({ ...editDetails, org_Banner: '' }); }} />
                        </Box>
                    </>
                )}
                {editMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={editProfile}>Save</Button>
                        <Button variant="outlined" onClick={cancelEdit}>Cancel</Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default UserProfile;
