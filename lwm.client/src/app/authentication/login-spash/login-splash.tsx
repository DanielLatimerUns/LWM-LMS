import React from "react";
import './login-splash.css';
import LoginModel from "../../../entities/app/loginModel";
import LwmButton from "../../../framework/components/button/lwm-button";
import AuthService from "../../../services/network/authentication/authService";

interface Props {
    onLoginSuccsess: Function;
}
 
interface State {
    loginModel: LoginModel;
    error: string;
}
 
export default class LoginSpash extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { loginModel: {username: "", password: ""}, error: "" };
    }
    
    render() { 
        return ( 
        <div className="loginSpashContainer">
            <div className="loginSplashHeader">
                LWM Learning Platform
            </div>
            <div className="loginSpashFormContainer">
                    <input 
                            key="Username" 
                            type="text"
                            id="username" 
                            value={this.state.loginModel.username}
                            onChange={this.handleFormChange.bind(this)}
                            placeholder="Username"/>
                    <input 
                            key="Password" 
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.loginModel.password}
                            onChange={this.handleFormChange.bind(this)}/>
            </div>
            <div className="loginSpashActionButtonsContainer">
                <LwmButton 
                name="Login" 
                onClick={this.handleLoginClicked.bind(this)} 
                isSelected={false}></LwmButton>
            </div>
            <div className="loginSpashErrorMessage">
                {this.state.error}
            </div>
        </div> );
    }

    private handleFormChange(e: any) {
        const changedModel = this.state.loginModel;
        const targetField: string = e.target.value;

        for (const field in changedModel) {
            if (field === e.target.id) {
                (changedModel as any)[field] = targetField;
            }
        }

        if (e.target === null) return;
        this.setState({loginModel: changedModel})
    }

    private async handleLoginClicked() {
        const didAuth = await AuthService.Login(this.state.loginModel);
        if (didAuth) {
            this.props.onLoginSuccsess();
            return;
        }

        this.setState({error: "Login Attempt Failed Invalid Credentials"});
    }
}