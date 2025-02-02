import React from 'react'
import { ScrollView } from 'react-native'
import StatusBar from "../../components/StatusBar";
import Search from '../../components/Search';
import NewProducts from '../../components/Home/NewProducts';
import colors from '../../styles/colors';

export default function Home() {
    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            <ScrollView>
                {/*** Banner */}
                <NewProducts />
            </ScrollView>

        </>
    )
}

