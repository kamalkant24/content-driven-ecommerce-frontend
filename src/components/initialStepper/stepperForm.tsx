import React from "react";
import UserInput from "../UserInput";
import { AdditionalDetails } from "../../interface";
import { industryTypes } from "./initialStepperContent";

interface StepperFromProps {
  additionalDetails: AdditionalDetails;
  setAdditionalDetails: React.Dispatch<React.SetStateAction<AdditionalDetails>>;
}

export const StepperForm: React.FC<StepperFromProps> = ({
  additionalDetails,
  setAdditionalDetails,
}) => {
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewBanner, setPreviewBanner] = React.useState("");

  const handleOrganization = (e: any) => {
    const { name, value } = e.target;
    if (name == "logo") {
      setAdditionalDetails({ ...additionalDetails, [name]: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else if (name == "banner") {
      setAdditionalDetails({ ...additionalDetails, [name]: e.target.files[0] });
      setPreviewBanner(URL.createObjectURL(e.target.files[0]));
    } else {
      setAdditionalDetails({ ...additionalDetails, [name]: value });
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="mx-auto bg-white rounded-md  text-left w-full">
          <h2 className="text-2xl font-semibold mb-4">
            {additionalDetails?.role === "vendor"
              ? "Organization"
              : "Additional"}{" "}
            Details
          </h2>
          <form className="flex flex-wrap justify-between text-sm ">
            {additionalDetails?.role === "vendor" && (
              <div className="my-4 w-full lg:w-[47.5%]">
                <label className="block text-gray-700 font-medium mb-2">
                  Organization Name
                </label>
                <UserInput
                  type="text"
                  id="org_Name"
                  placeholder="Organization Name"
                  onChange={handleOrganization}
                  name="org_Name"
                  showValue={additionalDetails?.org_Name}
                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                />
              </div>
            )}
            <div className="my-4 w-full lg:w-[47.5%]">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <UserInput
                type="number"
                id="phone"
                placeholder="Phone Number"
                onChange={handleOrganization}
                name="phone"
                showValue={additionalDetails?.phone}
                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
              />
            </div>
            {additionalDetails?.role === "vendor" && (
              <div className="my-4 w-full lg:w-[47.5%]">
                <label className="block text-gray-700 font-medium mb-2">
                  Choose Your Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  onChange={handleOrganization}
                  value={additionalDetails?.industry}
                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                >
                  <option className="h-8" value="" disabled selected>
                    Select Industry
                  </option>
                  {industryTypes.map((industry, idx) => (
                    <option key={idx} className="h-8" value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {additionalDetails?.role === "vendor" && (
              <div className="my-4 w-full lg:w-[47.5%]">
                <label className="block text-gray-700 font-medium mb-2">
                  Organization Size
                </label>
                <UserInput
                  type="number"
                  id="org_Size"
                  placeholder="Organization Size"
                  onChange={handleOrganization}
                  name="org_Size"
                  showValue={additionalDetails?.org_Size}
                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                />
              </div>
            )}
            <div className="my-4 w-full lg:w-[47.5%]">
              <label className="block text-gray-700 font-medium mb-2">
                Add Your Logo/Avatar
              </label>
              <div>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleOrganization}
                  accept="image/*"
                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                />
                {previewImage && (
                  <img src={previewImage} className="contain h-[4rem]" />
                )}
              </div>
            </div>
            {additionalDetails?.role === "vendor" && (
              <div className="my-4 w-full lg:w-[47.5%]">
                <label className="block text-gray-700 font-medium mb-2">
                  Organization Banner
                </label>
                <div>
                  <input
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={handleOrganization}
                    className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                  />
                  {previewBanner && (
                    <img src={previewBanner} className="contain h-[4rem]" />
                  )}
                </div>
              </div>
            )}
            <div className="my-4 w-full lg:w-[47.5%]">
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <UserInput
                type="text"
                id="address"
                placeholder="Address"
                onChange={handleOrganization}
                name="address"
                showValue={additionalDetails?.address}
                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
              />
            </div>
            {additionalDetails?.role === "vendor" && (
              <div className="my-4 w-full lg:w-[47.5%]">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <UserInput
                  type="text"
                  id="description"
                  placeholder="Company's Short Description"
                  onChange={handleOrganization}
                  name="description"
                  showValue={additionalDetails?.description}
                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
