import React, { useState, useCallback, useLayoutEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import StatusBar from '../../components/StatusBar';
import Search from '../../components/Search';
import ScreenLoading from '../../components/ScreenLoading';
import UserInfo from '../../components/Account/UserInfo';
import Menu from '../../components/Account/Menu';
import { getMeApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import colors from '../../styles/colors';

export default function Account() {

    const [user, setUser] = useState(null);

    const { auth } = useAuth();

    //console.log("Account===> " + user);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setUser(null);
                const response = await getMeApi(auth.token);
                setUser(response);
                // console.log("Account.js/user: " + user.name);
                // console.log("Account.js/auth.token: " + auth.token);
                //console.log("Account.js/response: " + response);
            })();

        }, [])
    );

    return (

        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="Ligth-content" />

            {!user ? (
                <ScreenLoading size="large" />
            ) : (
                <>
                    <Search />
                    <ScrollView>
                        <UserInfo user={user} />
                        <Menu />
                    </ScrollView>
                </>
            )}

        </>
    )
}


