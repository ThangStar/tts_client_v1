'use client'
import React from 'react'
import store from '../redux/store'
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';

function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Toaster />
            {children}
        </Provider>
    )
}

export default AppProvider
