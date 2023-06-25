import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./login.module.css";
import { getAllUsers } from "../../redux/actions/actionsUsers";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const users = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log(users);

  return (
    <div className={style.loginContainer}>
      <Formik
        initialValues={{
          mail: "",
          password: "",
        }}
        validate={(values) => {
          let errors = {};

          // Validación Username
          if (!values.mail) {
            errors.username = "Please enter your email";
          }

          // Validación Password
          if (!values.password) {
            errors.password = "Please enter your password";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("comprobar usuario");
          console.log(values);

          const foundUser = users.find(
            (user) => user.mail === values.mail && user.password === values.password
          );
          if (foundUser) {
            history.push("/menu");
          } else {
            setError("Invalid username or password");
            alert("Invalid username or password");
          }
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
          <form onSubmit={handleSubmit} className={style.form}>
            <section className={style.content}>
              <h1>Sign in:</h1>
              <div>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="text"
                  id="mail"
                  name="mail"
                  label="mail"
                  value={values.mail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mail && !!errors.mail}
                  helperText={touched.mail && errors.mail}
                  color="success"
                />
              </div>
              <div>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  color="success"
                />
              </div>
              <div className={style.actions}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="success"
                  className={style.button}
                >
                  Sign In
                </Button>
              </div>
              <div className={style.registerLink}>
                <Link to="/register">Don't have an account? Register here</Link>
              </div>
            </section>
          </form>
        )}
      </Formik>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default Login;
