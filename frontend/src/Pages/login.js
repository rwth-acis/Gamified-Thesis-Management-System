import "openidconnect-signin/openidconnect-signin-react.js"

const Login = () => {
    // <openidconnect-signin-react oidcClientId="localtestclient" popupRedirectUri="https://localhost:3000/"></openidconnect-signin-react>
    // 
    return(
        <openidconnect-signin-react oidcClientId="Thesis_System" popupRedirectUri="https://milki-psy.dbis.rwth-aachen.de/thesis-system-client/"></openidconnect-signin-react>
    )
}
export default Login