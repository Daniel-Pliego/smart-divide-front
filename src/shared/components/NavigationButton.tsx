import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export const NavigationButton = ({ children }: { children: React.ReactElement }) => {
    const router = useRouter()
    return (
        <Pressable onPress={() => router.back()}>
            {children}
        </Pressable>
    )
}
