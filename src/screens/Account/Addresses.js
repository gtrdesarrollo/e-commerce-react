import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { size } from 'lodash';
import { getAddressesApi } from '../../api/address';
import useAuth from '../../hooks/useAuth';

export default function Addresses() {
    const [addresses, setAddresses] = useState(false);
    const navigation = useNavigation();

    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getAddressesApi(auth);
                console.log(response);
                setAddresses(response);
            })();

        }, [])
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mis direcciones</Text>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("add-address")}>
                <View style={styles.addAdresses}>
                    <Text style={styles.addAdressesText}>Añadir una dirección</Text>
                    <IconButton icon="arrow-right" color="#000" size={19} />
                </View>
            </TouchableWithoutFeedback>
            {!addresses ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(addresses) === 0 ? (
                <Text style={styles.noAddressText}>Crear tu primera direccion</Text>
            ) : (
                <Text>Lista de Direcciones</Text>
            )
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
    },
    addAdresses: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addAdressesText: {
        fontSize: 16,
    },
    loading: {
        marginTo, p: 20,
    },
    noAddressText: {
        fontSize: 16,
        marginTop: 10,
        alignItems: "center",
    },
});
