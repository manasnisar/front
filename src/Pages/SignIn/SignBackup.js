import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { connect } from 'react-redux'
import { loginUserAsync, isAuth } from '../../redux/auth/auth-actions';
import Header from '../../Components/Header/Header'

const signInSchema = yup.object({
    email: yup.string().lowercase().trim().required('Email is a required field').email('Must be a valid Email'),
    password: yup.string().trim().required('Password is a required field').min(8).matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        "Must Contain 8 Characters, One Letter and One Number"
    ),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    image: {
        width: '100px',
        marginBottom: '20px'
    },
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
        <div>
            <Header title="Sharingan" page="signin" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="div">
                        <img src="Assets/Logos/mangekyo-logo.png" className={classes.image} alt="Sharingan Logo"/>
                    </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <ThemeProvider theme={theme}>
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
                        </ThemeProvider>
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
                    </form>
                </div>
            </Container>
        </div>


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