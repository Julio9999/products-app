import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useAuthStore } from '../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

const LogoutIconBotton = () => {

    const primaryColor = useThemeColor({}, 'primary');

    const { logout } = useAuthStore()

    return (
        <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={logout}
        >
            <Ionicons name='log-out-outline' size={24} color={primaryColor} />
        </TouchableOpacity>
    )
}

export default LogoutIconBotton;