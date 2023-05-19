import "openidconnect-signin/openidconnect-signin-react.js"

const Login = () => {

    return(
        <openidconnect-signin-react oidcClientId="Thesis_System" popupRedirectUri="https://milki-psy.dbis.rwth-aachen.de/thesis-system-client/"></openidconnect-signin-react>
    )
}
export default Login