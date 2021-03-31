import styles from './App.module.css';

import React from "react";
import Home from "./components/Home";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const styleClasses = useStyles();

  return (
    <div className={styles.App}>
      <CssBaseline />
      <Container>
        <div className={styleClasses.root}>
          <Home />
        </div>
      </Container>
    </div>
  );
}

export default App;
