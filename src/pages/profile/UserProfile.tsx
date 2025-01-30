import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { capitalize } from "@mui/material";
import { emailRegex } from "../../constants";

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
        profile_img: ''
    });

    useEffect(() => {
        setEditDetails({
            name: userProfile?.name,
            email: userProfile?.email,
            phone: userProfile?.phone,
            org_Name: userProfile?.org_Name,
            industry: userProfile?.industry,
            org_Size: userProfile?.org_Size,
            profile_img: userProfile?.profile_img
        })
    }, [editMode]);

    const [editProfileInput, setEditProfileInput] = useState(false);
    const [newImageFile, setNewImageFile] = useState<string>('');
    const [isErrorPresent, setIsErrorPresent] = useState<boolean>(true);
    const handleEditProfile = () => {
        setEditMode(!editMode)
    }

    const cancelEdit = () => setEditMode(!editMode);

    const handleprofilePicUpload = (e: any) => {
        const imageFile = e.target.files[0];
        setNewImageFile(imageFile);
        const url = URL.createObjectURL(imageFile);
        setEditDetails({ ...editDetails, profile_img: url })
        setEditProfileInput(false);
    }
    const handleEditInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setEditDetails({ ...editDetails, [field]: value });
    }
    const validate = () => {
        console.log(editDetails);

        for (const field in editDetails) {
            if (!editDetails[field]) {
                toast.warning(`${capitalize(field)} is Required.`);
                return
            }
            if (field === 'email') {
                if (!emailRegex.test(editDetails[field])) {
                    toast.warning(`Invalid Email`);
                    return
                }
            }
        }
        setIsErrorPresent(false)
    }
    const editProfile = () => {
        setIsErrorPresent(true)
        validate();
        if (!isErrorPresent) {
            const updatedDetails = {}
            for (const field in editDetails) {
                if (editDetails[field] !== userProfile[field]) {
                    updatedDetails[field] = editDetails[field]
                }
            }
            if (updatedDetails?.profile_img) {
                console.log('image updated successfully', newImageFile);
                updatedDetails.profile_img = newImageFile
            }
            if (Object.keys(updatedDetails).length > 0) {
                console.log(`Edit Details: `, updatedDetails);
            } else {
                setEditMode(false);
            }
        }
    }
    return (
        <div className="w-full p-4 md:mt-12 md:w-max mx-auto text-slate-500">
            {!editMode && <div className="relative flex flex-col border-0 shadow-blur rounded-2xl bg-white/80 mb-4">
                <div className="flex">
                    <div className="text-base h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white">
                        <img
                            src={userProfile?.profile_img}
                            alt="profile_image"
                            className="w-full shadow-soft-sm rounded-xl"
                        />
                    </div>
                    <div className="ml-3">
                        <h5 className="md:mb-1 capitalize">{userProfile?.name}</h5>
                        <h5 className="md:mb-1 font-bold capitalize">{userProfile?.org_Name}</h5>
                        <p className="mb-0 font-semibold text-base">Vendor</p>
                    </div>
                </div>
            </div>}

            <div className="w-full pb-4">
                <div className="mb-4">
                    <div className="relative flex flex-col min-w-0 break-words border-0 shadow-soft-xl rounded-2xl">
                        <div className="">
                            <div className="pb-2 flex justify-between items-center text-xl">
                                <h6 className="mb-0 text-xl font-bold">{editMode && 'Edit '}Profile Information</h6>
                                <MdEdit className="text-green-600 cursor-pointer" onClick={handleEditProfile} />
                            </div>
                            {editMode ? <textarea className="border border-black rounded-md w-full p-2" placeholder="Description"></textarea> : <p className="leading-normal text-sm md:text-base">Show description here that was added during initial stepper.</p>}
                            <hr className="my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                            <h6 className="mb-0 text-base font-bold pb-2">User Details</h6>
                            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                {editMode &&
                                    <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                        <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Profile Picture</span>
                                        {editProfileInput ? <input type="file" onChange={handleprofilePicUpload} accept="image/*"
                                        /> : <><div className="text-base h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white">
                                            <img
                                                src={editDetails?.profile_img}
                                                alt="profile_image"
                                                className="w-full shadow-soft-sm rounded-xl"
                                            />
                                        </div>
                                            <RxCross1 onClick={() => { setEditProfileInput(true); setEditDetails({ ...editDetails, profile_img: '' }) }} className="cursor-pointer" /></>}

                                    </li>}
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Full Name</span>
                                    {editMode ? <input value={editDetails?.name} className="border border-black rounded-md py-1 px-2" name="name" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.name}</span>}
                                </li>
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Mobile</span>
                                    {editMode ? <input value={editDetails?.phone} className="border border-black rounded-md py-1 px-2" name="phone" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.phone}</span>}
                                </li>
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Email</span>
                                    {editMode ? <input value={editDetails?.email} className="border border-black rounded-md py-1 px-2" name="email" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.email}</span>}
                                </li>
                            </ul>
                            <hr className="my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                            <h6 className="mb-0 text-base font-bold pb-2">Organization Details</h6>
                            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Organization Name</span>
                                    {editMode ? <input value={editDetails?.org_Name} className="border border-black rounded-md py-1 px-2" name="org_Name" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.org_Name}</span>}
                                </li>
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Industry</span>
                                    {editMode ? <input value={editDetails?.industry} className="border border-black rounded-md py-1 px-2" name="industry" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.industry}</span>}
                                </li>
                                <li className="block px-4 py-1 text-base flex gap-4 text-sm md:text-base">
                                    <span className="text-slate-700 w-[5rem] md:w-[11rem] font-bold">Organization Size</span>
                                    {editMode ? <input value={editDetails?.org_Size} className="border border-black rounded-md py-1 px-2" name="org_Size" onChange={handleEditInputChange} /> : <span className="capitalize">{userProfile?.org_Size}</span>}
                                </li>
                            </ul>
                            {editMode && <div className="flex items-center justify-center gap-4 my-4">
                                <button className="border border-blue-500 w-24 rounded-md py-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white" onClick={editProfile}>Save</button>
                                <button className="border border-blue-500 w-24 rounded-md py-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white" onClick={cancelEdit}>Cancel</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
