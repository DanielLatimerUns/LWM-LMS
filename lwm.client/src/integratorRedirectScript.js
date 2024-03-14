import moment from "moment";


const azureAuthService = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('token')

    if (requestToken) {
        localStorage.setItem('azure_token', JSON.stringify({ token: requestToken, cached: moment() }));
        document.getElementById("root").innerHTML = "Succsesfully Authenticated With the Storage Providor! You can now close this tab and return to the Main LWM App."
        return;
    }

    document.getElementById("root").innerHTML = "Authentication with Storage Providor failed, please reload the application and try again."

}

azureAuthService();