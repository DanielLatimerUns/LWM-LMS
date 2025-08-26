import React, { Fragment} from "react";
import { User } from "../../../../../entities/app/User";
import Form, { FormField } from "../../../../../framework/components/form/form";

export interface Props {
    user: User;
    onValidationChanged: Function;
    onChange: Function;
}

const UserWizard: React.FunctionComponent<Props> = (props) => {
    function renderForms() {
        const fields: FormField[] = [
            {
                label: "userName" ,
                id: "userName",
                value: props.user.userName,
                onFieldChanged: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Email" ,
                id: "email",
                value: props.user.email,
                onFieldChanged: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            }
        ];

        if (props.user.id === 0) {
            fields.push(
            {
                label: "Password" ,
                id: "password",
                value: props.user.password,
                onFieldChanged: handleFormChange,
                validationPattern: undefined,
                required: false,
                type: "password",
                selectOptions: undefined
            })
        }

        return (
            <Fragment>
                <div className="fieldSetHeader">User Record</div>
                <Form fields={fields} formObject={props.user} onFieldValidationChanged={props.onValidationChanged}/>
            </Fragment>)
    }
    
    function handleFormChange(changedPerson: User) {
        props.onChange(changedPerson);
    }
    
        return(
            <div className="userWizardContainer">
                <div className="userWizardBody">
                    {renderForms()}
                </div>
            </div>);
};

export default UserWizard;
