import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { deleteAddressApi } from '../../api/address';
import useAuth from '../../hooks/useAuth';

import colors from '../../styles/colors';


export default function AddressList(props) {
    const { addresses, setReloadAddress } = props;
    const { auth } = useAuth();
    const navigation = useNavigation();

    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminando dirección",
            `¿Estas seguro de que quieres eliminar la dirección ${address.title}?`,
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: () => deleteAddress(address._id),
                }
            ],
            { cancelable: false }
        )

    }

    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress);
            setReloadAddress(true);

        } catch (error) {
            console.log(error);
        }
    }

    const goToUpAddress = (idAddress) => {
        navigation.navigate("add-address", { idAddress });
    }

    return (
        <View style={StyleSheet.container}>
            {map(addresses, (address) => (
                <View key={address._id} style={styles.address}>
                    <Text style={styles.title}>{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <Text>{address.address}</Text>
                    <View style={styles.blockline}>
                        <Text>{address.state}, </Text>
                        <Text>{address.city}, </Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                    <Text>{address.country}</Text>
                    <Text>Número de Telefono: {address.phone}</Text>
                    <View style={styles.actions}>
                        <Button mode="contained" color={colors.primary}
                            onPress={() => goToUpAddress(address._id)}>
                            Editar
                        </Button>
                        <Button mode="contained" color={colors.primary}
                            onPress={() => deleteAddressAlert(address)}>
                            Eliminar
                        </Button>
                    </View>
                </View>

            ))
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5,
    },
    blockline: {
        flexDirection: "row",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    }

});
