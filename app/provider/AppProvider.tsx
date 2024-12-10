'use client'
import React from 'react'
import store from '../redux/store'
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import AuthProvider from './AuthProvider';
import { NextUIProvider } from '@nextui-org/react'

function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <AuthProvider>
                    <Toaster />
                    {children}
                </AuthProvider>
            </NextUIProvider>
        </Provider>
    )
}

export default AppProvider
