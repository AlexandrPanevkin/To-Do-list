import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const validate = (values: any) => {
    const errors: FormikErrorType = {};
    if (!values.firstName) {
        errors.password = 'Required';
    } else if (values.firstName.length > 15) {
        errors.password = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.email = 'Required';
    } else if (values.lastName.length > 20) {
        errors.email = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4) {
        errors.password = 'Password should be more 3 symbols';
    }

    return errors;
};

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" name='email' onChange={formik.handleChange}/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal" name='password' onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox name='rememberMe' onChange={formik.handleChange}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
