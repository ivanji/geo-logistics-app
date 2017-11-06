import React from 'react';
import {View, Image, StatusBar} from 'react-native';

const TopBar = () => {
    return(
        <View>

                <StatusBar
                    backgroundColor="green"
                    barStyle="dark-content"
                />

            <Image style={{marginTop:30}} source={require('./boral-logo.png')}/>
        </View>

    )
};

export default TopBar;