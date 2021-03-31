import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

import { Fade } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    githubButton: {
        marginRight: theme.spacing(0),
    },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header({title}) {
    const styleClasses = useStyles();
    const smallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    return (
        <div className={styleClasses.root}>
            <HideOnScroll>
                <AppBar style={{ background: '#e8ab05' }}>
                    <Toolbar>
                        <Tooltip arrow title="GitHub" placement="bottom">
                            <IconButton rel="noopener noreferrer" href="https://github.com/FongYoong/utar_hihive_attendance" target="_blank" edge="start" className={styleClasses.githubButton} color="inherit" aria-label="GitHub">
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                        <Fade triggerOnce>
                            <Typography variant="h5" className={styleClasses.title} noWrap={!smallScreen}>
                                {title}
                            </Typography>
                        </Fade>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </div>
    );
}
export default Header;
