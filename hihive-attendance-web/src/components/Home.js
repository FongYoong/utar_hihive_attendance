import {validateEmail} from "./utils";
import Header from "./Header";
import axios from 'axios';
import {React, useState, useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import { Zoom, Slide, Fade } from "react-awesome-reveal";

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.primary,
        margin: theme.spacing(1),
    },
    container: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function Home() {
    useEffect(() => {
        // Set webpage title
        document.title = "UTAR Hi-Hive Attendance";
    });

    const styleClasses = useStyles();
    const smallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const previousEmail = localStorage.getItem('email');
    const [email, setEmail] = useState(previousEmail ? previousEmail : "");
    const emailError = !validateEmail(email);

    const [gettingAttendance, setGettingAttendance] = useState(false);
    const [noRecord, setNoRecord] = useState(false);

    const [rawData, setRawData] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [currentSubject, setCurrentSubject] = useState(0);
    const [scheduleFilter, setScheduleFilter] = useState(() => ['lecture', 'tutorial', 'practical']);

    const processData = (data) => {
        if (data === "0:*:No record found !") {
            setNoRecord(true);
        }
        else {
            setNoRecord(false);
            localStorage.setItem('email', email);
            let subjects = data.split(":*:").slice(1).map((sub) => 
                sub.split(":**:").map((detail) => 
                    detail.split(":***:").map((detail2) => 
                        detail2.split(":-:")
                    )
                )
            );
            let user = subjects[0][0][0];
            user = {id: user[0], name: user[1]};
            setUserDetails(user);
            for (const [index, sub] of subjects.entries()) {
                let details = sub[0][0];
                const newDetails = {name: details[2], attendedTotal: details[3], total: details[4], percentage: parseFloat(details[3]) /  parseFloat(details[4]) * 100};
                let schedule = sub[1];
                const newSchedule = schedule.slice(0, -1).map((entry) => ({
                    date: entry[2].split(" ")[0],
                    recordedTime: entry[0].split(" ")[1],
                    classTime: entry[2].split(" ")[1].split(":").slice(0, -1).join(':'),
                    classType: entry[3],
                    duration: entry[4],
                    group: entry[5],
                    lecturer: entry[6],
                    attended: entry[7] === "A" || entry[7] === "N" ? true : false,
                }));
                subjects[index] = {details: newDetails, schedule: newSchedule};
            }
            setSubjects(subjects);
        }
        setGettingAttendance(false);
        setRawData(data);
    }

    const filterScheduleEntry = (entry) => {
        if (scheduleFilter.includes('absent')) {
            if (entry.attended) {
                return false;
            }
            if (scheduleFilter.includes('lecture') && entry.classType === 'Lecture') {
                return true;
            }
            if (scheduleFilter.includes('tutorial') && entry.classType === 'Tutorial') {
                return true;
            }
            if (scheduleFilter.includes('practical') && entry.classType === 'Practical') {
                return true;
            }
        }
        else {
            if (scheduleFilter.includes('lecture') && entry.classType === 'Lecture') {
                return true;
            }
            if (scheduleFilter.includes('tutorial') && entry.classType === 'Tutorial') {
                return true;
            }
            if (scheduleFilter.includes('practical') && entry.classType === 'Practical') {
                return true;
            }
        }
        return false;
    }

    const getAttendance = () => {
        if (!emailError) {
            setGettingAttendance(true);
            axios.get(`https://www.silverlakemobility.com/plugins/WebPlugIn?type=201&email=${email}`)
                .then(res => {
                processData(res.data);
            })
        }
    }

  return (
      <>
        <Header title="UTAR Hi-Hive Attendance" />
        <Paper className={styleClasses.paper}>
            <Container className={styleClasses.container}>
                <br />
                <Grid container spacing={2} direction="column" alignItems="center" justify="center">
                    <Grid item>
                        <Zoom duration={500} triggerOnce cascade>
                            <TextField
                                autoComplete={"email"}
                                autoFocus={true}
                                onChange={(event)=>{setEmail(event.target.value)}}
                                label="Email"
                                defaultValue={email}
                                error={emailError}
                                helperText="*Data will NOT be stored or misused on other servers"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        getAttendance();
                                    }
                                }}
                            />
                        </Zoom>
                    </Grid>
                    <Grid item>
                        <Zoom delay={200} duration={500} triggerOnce cascade>
                            <Button disabled={emailError || gettingAttendance} variant="contained" color="primary" endIcon={<SendIcon/>} onClick={getAttendance}>
                                Check Attendance
                            </Button>
                        </Zoom>
                    </Grid>

                </Grid>
                {gettingAttendance &&
                    <CircularProgress />
                }
                <Divider />
                <br />
                {rawData.length > 0 && (noRecord || subjects.length === 0) &&
                    <Fade triggerOnce cascade>
                        <Typography variant="h6">
                            No record found!
                        </Typography>
                        <br/>
                    </Fade>
                }
                {!noRecord && subjects.length > 0 &&
                    <Fade triggerOnce cascade>
                        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="body1">
                                        {userDetails.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        ID: {userDetails.id}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Grid item container spacing={2} direction="row" alignItems="center" justify="center">
                                <FormControl variant="outlined" className={styleClasses.formControl}>
                                    <InputLabel>Subject</InputLabel>
                                    <Select
                                        value={currentSubject}
                                        onChange={(event) => {setCurrentSubject(parseInt(event.target.value))}}
                                        label="Subject"
                                        >
                                        {
                                            subjects.map((sub, i) => (
                                                <MenuItem key={i} value={i}>{sub.details.name}</MenuItem>
                                            ))
                                        }
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item container spacing={2} direction="row" alignItems="center" justify="center">
                                <Grid item>
                                <Card className={styleClasses.card}>
                                    <CardContent className={styleClasses.cardContent}>
                                        <Typography variant="body1">
                                            Total hours attended: {subjects[currentSubject].details.attendedTotal}
                                        </Typography>
                                        <Typography variant="body1">
                                            Total hours: {subjects[currentSubject].details.total}
                                        </Typography>
                                        <Typography variant="h6">
                                            Percentage: {subjects[currentSubject].details.percentage.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </Grid>
                                <Grid item>
                                <ToggleButtonGroup size={smallScreen? "small":"medium" } value={scheduleFilter} onChange={(event, newValue)=>setScheduleFilter(newValue)}>
                                    <ToggleButton value="absent">
                                        {scheduleFilter.includes('absent') ? "Absent ✓" : "Absent"}
                                    </ToggleButton>
                                    <ToggleButton value="lecture">
                                        {scheduleFilter.includes('lecture') ? "Lecture ✓" : "Lecture"}
                                    </ToggleButton>
                                    <ToggleButton value="tutorial">
                                        {scheduleFilter.includes('tutorial') ? "Tutorial ✓" : "Tutorial"}
                                    </ToggleButton>
                                    <ToggleButton value="practical">
                                        {scheduleFilter.includes('practical') ? "Practical ✓" : "Practical"}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <Timeline align="left">
                                {
                                    subjects[currentSubject].schedule.filter(filterScheduleEntry).slice().reverse().map((entry, i) => (
                                        <TimelineItem key={i}>
                                            <TimelineOppositeContent>
                                                <Divider />
                                                <Typography variant="body1">
                                                    { entry.date }
                                                </Typography>
                                                <Typography variant="h6">
                                                    { entry.classType }
                                                </Typography>
                                                <Typography variant="body1">
                                                    { entry.classTime }
                                                </Typography>
                                                <Typography variant="body1">
                                                    ({entry.duration} {entry.duration > 1 ? "hours": "hour"})
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    { entry.lecturer }
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color={entry.attended ? "primary" : "secondary"} variant="outlined">
                                                    { entry.attended ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <ErrorIcon style={{ color: 'red' }} /> }
                                                </TimelineDot>
                                                <TimelineConnector style={{ backgroundColor: entry.attended ? 'green':'red' }} />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Paper elevation={3} className={styleClasses.paper}>
                                                    <Typography variant="body2">
                                                        Scanned at: {entry.recordedTime}
                                                        <br />
                                                    </Typography>
                                                </Paper>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))
                                }
                            </Timeline>
                        </Grid>
                    </Fade>
                }
            </Container>
        </Paper>
      </>
      
  );
}

export default Home;