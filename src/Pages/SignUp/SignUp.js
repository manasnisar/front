import React, { useEffect } from 'react';

import {Button, TextField, Grid, Typography, Paper, Link} from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';


import { useFormik } from 'formik';
import * as yup from 'yup'

import { connect } from 'react-redux'
import { registerUserAsync, isAuth } from '../../redux/auth/auth-actions';

import Mangekyo from '../../Components/Loaders/Mangekyo'

const signUpSchema = yup.object({
    firstName: yup.string().trim().required('First Name is a required field').max(120, "First Name must be less than 120 characters"),
    lastName: yup.string().trim().required('Last Name is a required field').max(120, "Last Name must be less than 120 characters"),
    email: yup.string().lowercase().trim().required('Email is a required field').email('Must be a valid Email'),
    orgName: yup.string().trim().required('Organization Name is a required field').max(120, "Organization Name must be less than 120 characters"),
    password: yup.string().trim().required('Password is a required field').min(8).matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        "Must Contain 8 Characters, One Letter and One Number"
    ),
    passwordAgain: yup.string().trim().required('Retype Password is a required field').test('passwordAgain', function(value) {
        return value !== this.parent.password ? this.createError({message: "Passwords do not match!", path:"passwordAgain"}) : true
    }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    animationGrid: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: "#050505",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    mainContainer: {
        height: '70%',
        maxHeight: "70%",
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
    },
    sloganContainer: {
        marginTop: '2rem',
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

    const onSignUpFormSubmit = (data) => {
        console.log(data)
        props.registerUserAsync(data, props.history)
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            orgName: '',
            password: '',
            passwordAgain: '',

        },
        validationSchema: signUpSchema,
        onSubmit: onSignUpFormSubmit,
    });


    return (
        <ThemeProvider theme={theme}>

            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={6} md={6} className={classes.animationGrid}>
                    <div className={classes.mainContainer}>
                        <div className={classes.animationContainer}>
                            <Mangekyo />
                        </div>
                        <div className={classes.sloganContainer}>
                            <Typography component="h1" className={classes.slogan}>
                                Let us watch it for you!
                            </Typography>
                        </div>  
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
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="passwordAgain"
                                        label="Retype Password"
                                        type="password"
                                        id="passwordAgain"
                                        value={formik.values.passwordAgain}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                                        helperText={formik.touched.passwordAgain && formik.errors.passwordAgain}
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
    registerUserAsync: (post, history) => dispatch(registerUserAsync(post, history)),
    isAuth: () => dispatch(isAuth())
})



export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(SignUp)
