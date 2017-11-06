import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OrderList = (props) => {

        return (
            <View style={styles.container}>
                <Text>Select an order from the list</Text>
                <FlatList
                    data={[
                        {key: 'Order #12434'},
                        {key: 'Order #12431'},
                        {key: 'Order #12432'},
                        {key: 'Order #124344'},
                        {key: 'Order #12454'},
                        {key: 'Order #12444'},
                        {key: 'Order #12702'},
                        {key: 'Order #12435'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
        );

};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

export default OrderList;