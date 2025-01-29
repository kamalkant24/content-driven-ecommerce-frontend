import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserProfile from "../profile/UserProfile";
import { useState } from "react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  // const getCurrentDateAndTime = () => {
  //   var currentdate = new Date();
  //   var datetime = currentdate.getDate() + "-"
  //     + (currentdate.getMonth() + 1) + "-"
  //     + currentdate.getFullYear() + " @"
  //     + currentdate.getHours() + ":"
  //     + currentdate.getMinutes() + ":"
  //     + currentdate.getSeconds();

  //   return datetime
  // }
  return (
    <div className="container my-4">
      <h5 className="font-bold mx-4">Account & Settings</h5>
      {/* <p className="text-sm text-gray-500">{getCurrentDateAndTime()}</p> */}

      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", p: '16px' }}>
          <TabList aria-label="lab API tabs example" onChange={handleChange}>
            <Tab label="Profile" value="1" />
            <Tab label="Settings" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <UserProfile />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <div className="w-full md:mt-12 w-max m-auto">
            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <h6 className="font-bold leading-tight uppercase text-xs text-slate-500">Account</h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit flex items-center">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="follow" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /><label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone follows me</label> </div>
                  </li>
                  <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="answer" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /> <label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone answers on my post</label> </div>
                  </li>
                  <li className="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="mention" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /> <label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone mentions me</label> </div>
                  </li>
                </ul>
                <h6 className="mt-6 font-bold leading-tight uppercase text-xs text-slate-500">Application</h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="launches projects" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /> <label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">New launches and projects</label> </div>
                  </li>
                  <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="product updates" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /> <label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Monthly product updates</label> </div>
                  </li>
                  <li className="relative block px-0 py-2 pb-0 bg-white border-0 rounded-b-lg text-inherit">
                    <div className="min-h-6 mb-0.5 block pl-0"> <input id="subscribe" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" /> <label className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Subscribe to newsletter</label> </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Setting;
