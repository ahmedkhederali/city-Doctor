// src/components/PersistentDrawerLeft.js
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useMediaQuery from '@mui/material/useMediaQuery';
import Hero from '../Hero/Hero';
import { AppContext } from '../../contextApi/AppContext';

const drawerWidth = 240;
const miniDrawerWidth = 60;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${miniDrawerWidth}px)`,
    marginLeft: `${miniDrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(!isMobile);
  const { drawerFWidth, setDrawerFWidth } = React.useContext(AppContext);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (!isMobile) {
      if(open){
        setDrawerFWidth(miniDrawerWidth)
      }else{
        setDrawerFWidth(drawerWidth)
      }
      setOpen(!open);
    } else {
      setOpen(true);
    }
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          ...(isMobile && {
            width: '100%',
            marginRight: 0,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            سرس الليان
          </Typography>
          <Button variant="h5" sx={{ fontWeight: 'bold' }} color="inherit">
            تسجيل الدخول
          </Button>
          <Button variant="h5" sx={{ fontWeight: 'bold' }} color="inherit">
            انشاء حساب
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['الدكاتره', 'الصيادلة', 'الحضانات', 'فقط'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
