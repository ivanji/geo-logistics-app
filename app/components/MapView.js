import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class LocationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: [],
            marker: {
                latlng: "-33.7949429, 151.1390104"
            }
        }
    }

    componentDidMount() {
        // Here is where we'd query your API for updated geo-locations and pass them down
        // to our components
        this.getDirections("-33.7949429, 151.1390104", "-33.8672182,151.2080889")
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            });
            this.setState({coords: coords});
            return coords
        } catch(error) {
            alert(error);
            return error
        }
    };

    render() {
        let marker = {
            latlng: "-33.7949429,151.1390104"
        };
        return (
            <View>
                <MapView style={styles.map} initialRegion={{
                    latitude:-33.7949429,
                    longitude:151.1390104,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>

                    <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={3}
                        strokeColor="red"/>

                    <MapView.Marker
                        coordinate={{latitude:-33.7949429,
                            longitude:151.1390104}}
                        image={require('./boral-truck.png')}
                    />

                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});