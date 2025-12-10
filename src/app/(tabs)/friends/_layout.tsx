import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: "#fff",
                },
                statusBarStyle: "dark"
            }}
        >

        </Stack>
    )
}