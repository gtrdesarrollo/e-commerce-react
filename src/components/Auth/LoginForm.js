import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';
import { loginApi } from '../../api/user';

import { formStyles } from '../../styles';

export default function LoginForm(props) {
    const { changeForm } = props;

    const [loading, setloading] = useState(false);

    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setloading(true);

            try {
                const response = await loginApi(formData);
                console.log(response);

                if (response.statusCode) {
                    throw "Error en el usuario o contraseña.";
                } else {
                    login(response);
                }
            } catch (error) {
                console.log(error);
                Toast.show(error, { position: Toast.positions.CENTER })
                setloading(false);
            }
        }
    });


    return (
        <View>
            <TextInput label='Email o UserName' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput label='Contraseña' style={formStyles.input} secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <Button mode="Contained" style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Entrar
            </Button>

            <Button
                mode="Text"
                style={formStyles.btnText}
                onPress={changeForm}
            >
                Registrarse
            </Button>

        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: "",
    };
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    };
}