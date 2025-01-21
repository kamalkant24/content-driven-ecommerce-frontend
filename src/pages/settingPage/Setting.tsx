import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserProfile from "../profile/UserProfile";
import { useState } from "react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("1");
  const handleChange = (event: any) => {
    setActiveTab(event?.target.value);
  };
  return (
    <div className="container mt-5">
      <h5>Account & Settings</h5>
      <p>4:55 pm 21 jul 2023</p>

      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="lab API tabs example">
            <Tab label="Profile" value="1" onChange={handleChange} />
            <Tab label="Item Two" value="2" onChange={handleChange} />
            <Tab label="Item Three" value="3" onChange={handleChange} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserProfile />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
};

export default Setting;
