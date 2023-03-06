import "openidconnect-signin/openidconnect-signin-react.js"

const Login = () => {

    return(
        <openidconnect-signin-react oidcClientId="BA_Silyu_Li" popupRedirectUri="http://localhost:3000/"></openidconnect-signin-react>
    )
}
export default Login