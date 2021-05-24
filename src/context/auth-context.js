import React from 'react';

const AuthContext = React.createContext({
    user: null,
    token: null,
})

const AuthProvider = (props) => {
    const [user, setUser] = React.useState(null);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    const context = React.useContext(AuthContext)

    return context;
}

export {
    AuthContext,
    AuthProvider,
    useAuthContext
}
  