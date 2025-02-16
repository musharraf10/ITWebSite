import * as React from "react";
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import PeopleIcon from "@mui/icons-material/People";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Style } from "@mui/icons-material";
import OHome from "../../pages/HomePage/OHome";
import {AdminHome} from "../../pages/HomePage/AdminContentEdit";

// Navigation items
const NAVIGATION = [
  {
    segment: "home",
    title: "Home Management",
    icon: <HomeIcon />,
  },
  { segment: "usermanagement", title: "User Management", icon: <PeopleIcon /> },
  {
    segment: "contentmanagement",
    title: "Content Management",
    icon: <EditCalendarIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "financial",
        title: "Financial Reports",
        icon: <DescriptionIcon />,
      },
      {
        segment: "taskreports",
        title: "Task Reports",
        icon: <DescriptionIcon />,
      },
    ],
  },
  { segment: "communication", title: "Communication", icon: <ChatIcon /> },
];

const drawerWidth = 240;

// Custom theme with the provided colors
const themeWithCustomColors = createTheme({
  palette: {
    primary: {
      main: "#1995AD",
    },
    secondary: {
      main: "#A1D6E2",
    },
    background: {
      default: "#F1F1F2",
    },
  },
});

// Styled Main content
// Styled Main content
const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    flexGrow: 1, // Take up the remaining space
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh", // Full height
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? `${drawerWidth}px` : "0px", // Adjust margin based on drawer state
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust width based on drawer state
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      width: "100%",
      padding: theme.spacing(1),
    },
  }));
  
  // Styled AppBar
  const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    marginLeft: open ? `${drawerWidth}px` : "0px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
    },
  }));
  
export default function AdminDashBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const [selectedSegment, setSelectedSegment] = React.useState("home");
  const [reportOpen, setReportOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => setOpen(!open);
  const handleReportsClick = () => setReportOpen(!reportOpen);

  const renderContent = () => {
    switch (selectedSegment) {
      case "home":
        return <Typography paragraph>🏠 Home</Typography>;
      case "usermanagement":
        return <Typography paragraph>👥 User Management Content</Typography>;
      case "contentmanagement":
        return <Typography paragraph><AdminHome/></Typography>;
      case "financial":
        return <Typography paragraph>💰 Financial Reports</Typography>;
      case "taskreports":
        return <Typography paragraph>📊 Task Reports</Typography>;
      case "communication":
        return <Typography paragraph>💬 Communication Center</Typography>;
      default:
        return <Typography paragraph>🔍 Select a menu item</Typography>;
    }
  };

  

  return (
    <ThemeProvider theme={themeWithCustomColors}>
      <Box sx={{ display: "flex", flexGrow: 1, minHeight: "100vh" }}>
        <CssBaseline />
        <CustomAppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </CustomAppBar>
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            {NAVIGATION.map((item) => (
              <React.Fragment key={item.segment}>
                <ListItem disablePadding>
                  {item.segment === "reports" ? (
                    <ListItemButton onClick={handleReportsClick}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                      {reportOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      onClick={() => setSelectedSegment(item.segment)}
                      selected={selectedSegment === item.segment}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  )}
                </ListItem>
                {item.children && (
                  <Collapse in={reportOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.segment}
                          sx={{ pl: 4 }}
                          onClick={() => setSelectedSegment(child.segment)}
                          selected={selectedSegment === child.segment}
                        >
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>

        <Main open={open} style={{ marginLeft: open ? "0px" : "-240px"}}>
          <Toolbar />
          {renderContent()}
        </Main>
      </Box>
    </ThemeProvider>
  );
}