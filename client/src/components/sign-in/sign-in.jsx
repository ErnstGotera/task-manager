import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useDispatch } from 'react-redux';

import { login } from '../../redux/user/user.actions';

const useStyles = makeStyles((theme) => ({
  fabs: {},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#4867EF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    color: '#fff',
    backgroundColor: '#4867EF',
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
      background: '#0F2B62',
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography className='gray' component='h1' variant='h5'>
          Iniciar Sesion
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Correo Electronico'
            name='email'
            autoComplete='email'
            onChange={(e) => onChange(e)}
            value={email}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            type='password'
            onChange={(e) => onChange(e)}
            value={password}
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            className='gray'
            control={<Checkbox value='remember' color='primary' />}
            label='Recordar en este dispositivo'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
          >
            Iniciar Sesion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                ¿Olvido su contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
