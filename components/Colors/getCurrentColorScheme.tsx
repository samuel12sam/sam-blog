import { useColorScheme } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

export function getCurrentColorScheme() {
    const colorScheme = useColorScheme();
    return (
        Colors[colorScheme??'light']
    )
}



