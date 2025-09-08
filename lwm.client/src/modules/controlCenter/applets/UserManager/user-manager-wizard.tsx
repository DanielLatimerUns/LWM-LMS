import React, { Fragment } from 'react'
import Form, { FormField } from "../../../../framework/components/form/form.tsx";
import { User } from "../../../../entities/app/User.ts";

export interface Props{
    user: User;
    onChanged: Function;
    onValidationChanged: Function;
}

const userManagerWizard: React.FunctionComponent<Props> = (props) => {

    const fields: FormField[] = [
        {
            label: "Username" ,
            id: "username",
            value: props.user.userName,
            onFieldChanged: props.onChanged,
            validationPattern: undefined,
            required: true,
            type: "text",
            selectOptions: undefined
        },
        {
            label: "Email",
            id: "email",
            value: props.user.email,
            onFieldChanged: props.onChanged,
            validationPattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/\n',
            required: true,
            type: "text",
            selectOptions: undefined
        }
    ];
    
    return (
        <Fragment>
            <div className="fieldSetHeader">User Creation</div>
            <Form onFieldValidationChanged={props.onValidationChanged}
                  formObject={props.user}
                  fields={fields}/>
        </Fragment>
    )
}

export default userManagerWizard;
