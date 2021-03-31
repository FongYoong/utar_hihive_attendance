import React from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import sadImage from '../images/sad.png';
import { Zoom } from "react-awesome-reveal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }
  refreshPage() {
      window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Dialog
            open={true}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Something went wrong!</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Oops, seemed like you successfully crashed the website.
            </DialogContentText>
            <Zoom duration={500} triggerOnce cascade>
                <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box mb={2} display="flex" justifyContent="center" width="100%">
                        <img width="50%" height="auto" src={sadImage} alt="Feel the pain" />
                    </Box>
                    <Button variant="contained" color="primary" endIcon={<RefreshIcon/>} onClick={this.refreshPage}>
                        Refresh Page!
                    </Button>
                </Box>
            </Zoom>
            </DialogContent>
        </Dialog>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;