import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { size } from 'lodash';
import AddressList from '../../components/Address/AddressList';
import { getAddressesApi } from '../../api/address';
import useAuth from '../../hooks/useAuth';

export default function Addresses() {
    const [addresses, setAddresses] = useState(false);
    const [reloadAddress, setReloadAddress] = useState(false);
    const navigation = useNavigation();

    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setAddresses(null);

            (async () => {
                const response = await getAddressesApi(auth);
                console.log(response);
                // console.log(auth);
                setAddresses(response);
                setReloadAddress(false)
            })();

        }, [reloadAddress])
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
                <Text style={styles.noAddressText}>Crear tu primera dirección</Text>
            ) : (
                <AddressList addresses={addresses} setReloadAddress={setReloadAddress} />
            )}

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
        marginTop: 20,
    },
    noAddressText: {
        fontSize: 16,
        marginTop: 10,
        alignItems: "center",
    },
});
