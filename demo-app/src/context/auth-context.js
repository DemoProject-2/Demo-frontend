import React from 'react';

const AuthContext = React.createContext({
    user: null,
    token: null,
})

const AuthProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    function _setToken(jwtToken) {
        setToken(jwtToken)
    }

    function _setUser(userData) {
        setUser(userData)
    }

    return (
        <AuthContext.Provider value={{user, token, _setToken, _setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}
  