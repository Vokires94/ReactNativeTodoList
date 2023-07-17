import { Icon } from '@react-native-material/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity onPress={props.toggleTask}>
                    <View style={styles.square}>
                        {props.status && <Icon name='check' size={24} color='green' />}
                    </View>
                </TouchableOpacity>
                <Text style={styles[props.status ? 'itemTextDone' : 'itemText']}>{props.text}</Text>
            </View>
            <View style={styles.itemRight}>
                <TouchableOpacity onPress={props.deleteTask}>
                    <Text style={styles.delete}>
                        Delete
                    </Text>
                </TouchableOpacity>
                <View style={[styles.circular, styles[props.status ? 'doneTask' : 'openTask']]}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        width: '80%',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        width: '20%',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    circular: {
        color: '#55BCF6',
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 5,
    },
    openTask: {
        borderColor: '#f10b0b',
    },
    doneTask: {
        borderColor: '#0bf11f',
    },
    delete: {
        color: 'red',
        marginRight: 8,
    },
    itemText: {
        flex: 1,
    },
    itemTextDone: {
        flex: 1,
        textDecorationLine: 'line-through',
    },
});

export default Task;