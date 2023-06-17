import style from './login.module.css'
//import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const history = useHistory();
    const [error, setError] = useState('')

    const users = [
        {
            "username" : "pepito",
            "password" : "pepito1234"
        },
        {
            "username" : "pablito",
            "password" : "pablito1234"
        },
        {
            "username" : "carmen",
            "password" : "carmen1234"        
        },
        {
            "username" : "juana",
            "password" : "juana1234"
        },
        {
            "username" : "miguel",
            "password" : "miguel1234"
        }
    ]

    return (
        <div className={style.loginContainer} >
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validate={(valores) => {
                    let errores = {}

                    //Validacion Username
                    if(!valores.username){
                        errores.username = 'Por favor ingrese su usuario'
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)){
                        errores.username = 'Solo debe ingresar letras y espacios'
                    }

                    //Validacion Password
                    if(!valores.password){
                        errores.password = 'Por favor ingresar su contraseña'
                    }

                    return errores
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm()
                    console.log('comprobar usuario')
                    console.log(valores)

                    const foundUser = users.find((user) => 
                        user.username === valores.username && user.password === valores.password
                    )
                    if(foundUser) {
                        history.push('/home')
                    } else {
                        setError('El usuario ingresado no existe')
                    }

                }}
            >
                {( {handleSubmit, values, handleChange, handleBlur, errors, touched} ) => (
                    <form className={style.form} onSubmit={handleSubmit} >
                        <div className={style.div} >
                            <input 
                                type='text' 
                                id='username' 
                                name='username' 
                                placeholder='Username...' 
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={style.input}
                            />
                            {touched.username &&  errors.username && <div>{errors.username}</div>}
                        </div>
                        <div className={style.div} >
                            <input 
                                type='password' 
                                id='password' 
                                name='password' 
                                placeholder='Password...' 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={style.input}
                            />
                            {touched.password &&  errors.password && <div>{errors.password}</div>}
                        </div>
                        <div className={style.img} >
                            
                        </div>
                        <div className={style.buttonContainer} >
                            <button className={style.button} type='submit' >Join</button>
                        </div>
                    </form>
                )}
            </Formik>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login