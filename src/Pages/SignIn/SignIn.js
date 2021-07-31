import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';


import { useFormik } from 'formik';
import * as yup from 'yup'

import { connect } from 'react-redux'
import { loginUserAsync, isAuth } from '../../redux/auth/auth-actions';

import Sharingan from '../../Components/Loaders/Sharingan'


const signInSchema = yup.object({
    email: yup.string().lowercase().trim().required('Email is a required field').email('Must be a valid Email'),
    password: yup.string().trim().required('Password is a required field').min(8).matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        "Must Contain 8 Characters, One Letter and One Number"
    ),
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    animationGrid: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: "#050505",
        display: 'flex',
        flexDirection: 'column'
    },
    brandImage: {
        width: '125px',
        marginBottom: '20px'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '50%',
        marginTop: '10vh',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            marginTop: '15vh'
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#050505",
        color: '#e41515',
        border: '1px solid #050505',
        '&:hover': {
            background: 'white',
            border: '1px solid black',
            color: 'black',
            boxShadow: "none"
        }
    },
    errorMessage: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        alignItems: 'center'
    },
    grid: {
        display: 'flex',
        justifyContent: 'center'
    },
    animationContainer: {
        flexBasis: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    slogan: {
        color: '#e41515',
        fontFamily: 'Style Script, cursive',
        fontSize: '54px',
        fontWeight: '300',
        lineHeight: '58px'
    },
    sloganContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-8rem',
        [theme.breakpoints.down('md')]: {
            marginTop: '-12rem',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#050505"
        }
    },
});

const SignIn = (props) => {
    const classes = useStyles();


    useEffect(() => {
        if (props.isAuthenticated) {
            if (props.user.role === "admin") {
                props.history.push("/admin")
            } else {
                props.history.push("/home")
            }

        }
    }, [props.isAuthenticated, props.history, props.user])

    const onSignInFormSubmit = (data) => {
        props.loginUserAsync(data, props.history)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: onSignInFormSubmit,
    });


    return (
        <ThemeProvider theme={theme}>

        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.animationGrid}>
                <div className={classes.animationContainer}>
                    <Sharingan />
                </div>
                <div className={classes.sloganContainer}>
                    <Typography component="h1" className={classes.slogan}>
                        We see it all!
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} className={classes.grid}>
                <div className={classes.paper}>
                    <Typography component="div">
                        <img src="Assets/Logos/mangekyo-logo.png" className={classes.brandImage} alt="Sharingan Logo" />
                    </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {
                            props.loginFailure ?
                                <div className={classes.errorMessage}><div>{props.loginError}!</div></div>
                                : null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {props.loginPending ? "Please Wait..." : "Sign In"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
        </ThemeProvider>

    );
}

const mapStatetoProps = state => ({
    loginError: state.authState.error,
    loginFailure: state.authState.loginFailure,
    loginPending: state.authState.pending,
    isAuthenticated: state.authState.isAuthenticated,
    user: state.authState.user
})

const mapDispatchToProps = dispatch => ({
    loginUserAsync: (post, history) => dispatch(loginUserAsync(post, history)),
    isAuth: () => dispatch(isAuth())
})



export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(SignIn)
