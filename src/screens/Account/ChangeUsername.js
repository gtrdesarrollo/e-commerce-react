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

export default function ChangeUserName() {

    const [loading, setloading] = useState(false);

    const { auth } = useAuth();

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                //console.log(response);

                if (response.username) {
                    await formik.setFieldValue("username", response.username);
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
                //console.log(formData);

                const response = await updateUserApi(auth, formData);
                if (response.statusCode) throw ("Nombre del Usuario ya existe...");

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
            <TextInput label='Nombre del Usuario' style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />

            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar Nombre del Usuario</Button>
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
        username: "",
    };
}

function validationSchema() {
    return {
        username: Yup.string().required(true),
    };



}