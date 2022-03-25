import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { getMeApi, updateUserApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';

import { formStyles } from '../../styles'

export default function ChangeName() {
    const [loading, setloading] = useState(false);

    const { auth } = useAuth();

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);

                if (response.name && response.lastname) {
                    await formik.setFieldValue("name", response.name);
                    await formik.setFieldValue("lastname", response.lastname);
                    //console.log(response.name, response.lastname);
                }
            })();

        }, [])
    );

    const formik = useFormik({

        initialValues: initialValues(),

        validationSchema: Yup.object(validationSchema()),

        onSubmit: async (formData) => {

            try {
                setloading(true);
                // console.log("Formulario Enviado");
                console.log(formData);

                await updateUserApi(auth, formData);
                navigation.goBack();
            } catch (error) {
                console.log(error);
                Toast.show(error, { position: Toast.positions.CENTER })
                setloading(false);
            }
        }
    });


    return (
        <View>
            <TextInput label='Nombre' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                value={formik.values.name}
                error={formik.errors.name}
            />

            <TextInput label='Apellidos' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("lastname", text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />

            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombre y apellidos</Button>
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
        name: "",
        lastname: "",
    };
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    };
}