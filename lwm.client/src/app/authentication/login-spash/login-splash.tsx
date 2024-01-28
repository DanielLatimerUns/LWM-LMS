import React from "react";
import './login-splash.css';
import Form from "../../../framework/components/form/form";
import LoginModel from "../../../entities/app/loginModel";
import LwmButton from "../../../framework/components/button/lwm-button";
import AuthService from "../../../services/network/authentication/authService";

interface Props {
    onLoginSuccsess: Function
}
 
interface State {
    loginModel: LoginModel
}
 
export default class LoginSpash extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { loginModel: {username: "", password: ""}  };
    }
    
    render() { 
        return ( 
        <div className="loginSpashContainer">
            <div className="loginSplashHeader">
                <h2>Learn With Me</h2>
            </div>
            <div className="loginSpashFormContainer">
                <Form>
                    <input 
                            key="User Name" 
                            type="text"
                            id="username" 
                            value={this.state.loginModel.username}
                            onChange={this.handleFormChange.bind(this)}/>
                    <input 
                            key="Password" 
                            type="password"
                            id="password" 
                            value={this.state.loginModel.password}
                            onChange={this.handleFormChange.bind(this)}/>
                </Form>
            </div>
            <div className="loginSpashActionButtonsContainer">
                <LwmButton 
                name="Login" 
                onClick={this.handleLoginClicked.bind(this)} 
                isSelected={false}></LwmButton>
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
       }
    }
}