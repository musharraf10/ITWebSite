import React, { useEffect, useState } from "react";
import { styled, useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
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
import { AdminHome } from "../../pages/HomePage/AdminContentEdit";

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
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, marginLeft }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: marginLeft, // Use marginLeft from props
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
}));

export default function AdminDashBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [selectedSegment, setSelectedSegment] = useState("home");
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
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
        return <Typography paragraph><AdminHome /></Typography>;
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

  // Handle marginLeft logic based on screen size and drawer state
  const marginLeft = isMobile ? "0px" : open ? `$0px` : "-240px";

  return (
    <ThemeProvider theme={themeWithCustomColors}>
      <Box sx={{ display: "flex", flexGrow: 1, minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{zIndex:9999}}>
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
        </AppBar>
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
          <List style={{zIndex: 1200}}>
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

        <Main open={open} marginLeft={marginLeft}>
          <Toolbar />
          {renderContent()}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
