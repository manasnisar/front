import React, { useEffect } from 'react';

import {Button, TextField, Grid, Typography, Paper, Link} from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';


import { useFormik } from 'formik';
import * as yup from 'yup'

import { connect } from 'react-redux'
import { loginUserAsync, isAuth } from '../../redux/auth/auth-actions';

import Mangekyo from '../../Components/Loaders/Mangekyo'

const signInSchema = yup.object({
    firstName: yup.string().trim().required('First Name is a required field').max(120, "First Name must be less than 120 characters"),
    lastName: yup.string().trim().required('Last Name is a required field').max(120, "Last Name must be less than 120 characters"),
    email: yup.string().lowercase().trim().required('Email is a required field').email('Must be a valid Email'),
    orgName: yup.string().trim().required('Organization Name is a required field').max(120, "Organization Name must be less than 120 characters"),
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
        fontSize: '60px',
        fontWeight: '300',
        lineHeight: '58px'
    },
    sloganContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-6rem',
        [theme.breakpoints.down('md')]: {
            marginTop: '-10rem',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    titleContainer: {
        marginBottom: '2em',
    },
    title: {
        color: '#050505',
        fontSize: '36px',
        fontWeight: '300',
        lineHeight: '58px'
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#050505"
        }
    },
    typography: {
        fontFamily: `"Poppins", "Roboto"`,
    },
});

const SignUp = (props) => {
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
            firstName: '',
            lastName: '',
            email: '',
            orgName: '',
            password: '',

        },
        validationSchema: signInSchema,
        onSubmit: onSignInFormSubmit,
    });


    return (
        <ThemeProvider theme={theme}>

            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={6} md={6} className={classes.animationGrid}>
                    <div className={classes.animationContainer}>
                        <Mangekyo />
                    </div>
                    <div className={classes.sloganContainer}>
                        <Typography component="h1" className={classes.slogan}>
                            Let us watch it for you!
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} className={classes.grid}>
                    <div className={classes.paper}>
                        <Typography component="div" className={classes.titleContainer}>
                            <Typography component="h1" className={classes.title}>
                                Let's get you set up
                            </Typography>
                        </Typography>
                        <form className={classes.form} onSubmit={formik.handleSubmit}>

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.textField}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        margin="normal"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        margin="normal"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="orgName"
                                        label="Organization Name"
                                        name="orgName"
                                        value={formik.values.orgName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.orgName && Boolean(formik.errors.orgName)}
                                        helperText={formik.touched.orgName && formik.errors.orgName}
                                        autoComplete="orgname"
                                    />

                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                            </Grid>
                            {
                                props.signUpFailure ?
                                    <div className={classes.errorMessage}><div>{props.signUpError}!</div></div>
                                    : null
                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {props.signUpPending ? "Please Wait..." : "Sign Up"}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        {"Already have an account? Sign In"}
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
    signUpError: state.authState.error,
    signUpFailure: state.authState.signUpFailure,
    signUpPending: state.authState.pending,
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
)(SignUp)
