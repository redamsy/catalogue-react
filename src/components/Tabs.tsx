import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ProductTable from "./ProductTable";
import CategoryTable from "./CategoryTable";
import SubCategoryTable from "./SubCategoryTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
        >
          <Tab icon={<ProductionQuantityLimitsIcon />} label="Products" {...a11yProps(0)} />
          <Tab icon={<WorkspacesIcon />} label="Categories" {...a11yProps(1)} />
          <Tab icon={<CategoryIcon />} label="Sub Categories" {...a11yProps(2)} />
        </Tabs>
      </Box>
          
      <TabPanel value={value} index={0}>
        <ProductTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SubCategoryTable />
      </TabPanel>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
