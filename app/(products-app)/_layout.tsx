import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import LogoutIconBotton from '@/presentation/auth/components/LogoutIconBotton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';



const CheckAuthenticationLayout = () => {

    const { status, checkStatus } = useAuthStore();

    const backgroundColor = useThemeColor({}, 'background');

    useEffect(() => {
        checkStatus();
    }, [])


    if (status === 'checking') {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5
        }}>
            <ActivityIndicator size={30} />
        </View>
    }


    if (status === 'unauthenticated') {
        return <Redirect href='/auth/login' />
    }


    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor
                },
                contentStyle: {
                    backgroundColor: backgroundColor
                }
            }}
        >
            <Stack.Screen
                name='(home)/index'
                options={{
                    title: 'Productos',
                    headerLeft: () => <LogoutIconBotton />
                }}
            />

            <Stack.Screen
                name='(home)/product/[id]'
                options={{
                    title: 'Producto',
                }}
            />

        </Stack>
    )
}

export default CheckAuthenticationLayout;