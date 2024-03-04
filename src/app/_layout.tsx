import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

export default function AppLayout() {

    const [loaded, error] = useFonts({
        Courier: require('../../assets/fonts/CourierPrime-Regular.ttf'),
        // 'Inter-Black': require('@/assets/fonts/Inter-Black.ttf'),
        // 'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
        // 'Inter-ExtraBold': require('@/assets/fonts/Inter-ExtraBold.ttf'),
        // 'Inter-ExtraLight': require('@/assets/fonts/Inter-ExtraLight.ttf'),
        // 'Inter-Light': require('@/assets/fonts/Inter-Light.ttf'),
        // 'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
        // 'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
        // 'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
        // 'Inter-Thin': require('@/assets/fonts/Inter-Thin.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name='index'/*name of the file*/ options={{ title: 'Posts' }} />
            <Stack.Screen name='[slug]'/*name of the file*/ options={{ title: 'Post Details' }} />
        </Stack>
    )
}

const styles = StyleSheet.create({})