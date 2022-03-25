import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { updateUserApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';

import { formStyles } from '../../styles'

export default function ChangePassword() {

    const [loading, setloading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({

        initialValues: initialValues(),

        validationSchema: Yup.object(validationSchema()),

        onSubmit: async (formData) => {

            try {
                setloading(true);
                //console.log(formData);

                const response = await updateUserApi(auth, formData);
                if (response.statusCode) throw ("Error al cambiar la Contraseña...");

                navigation.goBack();
            } catch (error) {
                //console.log(error);
                Toast.show(error, { position: Toast.positions.CENTER })
                setloading(false);
            }
        }
    });


    return (
        <View>
            <TextInput label='Nueva Contraseña' style={formStyles.input} secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <TextInput label='Repetir nueva Contraseña' style={formStyles.input} secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar Contraseña</Button>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})


function initialValues() {
    return {
        password: "",
        repeatPassword: "",
    };
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")], true),
    };


}