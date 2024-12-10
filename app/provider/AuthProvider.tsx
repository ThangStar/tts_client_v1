import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthenticateAction, AuthenticateState } from '../redux/slices/auth.slice'

function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<any>()
    const { user }: AuthenticateState = useSelector((state: any) => {
        return state.authenticate.value
    })

    const { profile } = AuthenticateAction
    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt_voice='))?.split('=')[1]
        if (user != undefined || token == undefined) return
        console.log("token", token, user);
        dispatch(profile())
    }, [dispatch, profile, user])
    return children
}

export default AuthProvider
