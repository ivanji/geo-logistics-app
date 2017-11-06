import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';

import LocationView from './app/components/MapView';
import Polyline from '@mapbox/polyline';
import TopBar from './app/components/TopBar';
import FlatListBasics from './app/components/orderList';


export default class RnDirectionsApp extends Component {
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
                <TopBar/>
                <Text>
                    View map below to locate your order.
                </Text>
                <LocationView />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        width: "90%",
        height: 500
    },
});
AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);