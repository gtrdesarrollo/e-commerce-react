import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerApi } from '../../api/user'
import Toast from 'react-native-root-toast'

import { formStyles } from '../../styles'


export default function RegisterForm(props) {

    const { changeForm } = props;
    const [loading, setloading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData);

            setloading(true);

            try {
                const response = await registerApi(formData);
                console.log(response);
                console.log(response.statusCode);
                if (response == null) {
                    throw "Error de conexión al registrar el usuario";
                    return null;
                } else if (response.statusCode == 400) {
                    throw "El usuario ya esta registrado.";
                    return null;
                } else {
                    changeForm();
                }
            } catch (error) {
                //console.log(error);
                Toast.show(error, { position: Toast.positions.CENTER })
                setloading(false);
            }
        }
    });


    return (
        <View>
            <TextInput label='Email' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />

            <TextInput label='Nombre del Usuario' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />

            <TextInput label='Contraseña' style={formStyles.input} secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <TextInput label='Repetir Contraseña' style={formStyles.input} secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Button mode="Contained" style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Registrarse
            </Button>

            <Button
                mode="Text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}
            >
                Iniciar sesión
            </Button>

        </View>
    );
}

function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    };
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    };
}