import React from "react";
import './form.css'
import FormField from "../../../entities/framework/formField";

interface Props {
    fields: FormField[];
    onFieldValidationChanged: Function;
}
 
interface State { 
}
 
export default class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.fields.forEach(field => this.validateField(field));
    }

    render() { 
        return ( 
            <div className="formFieldContainer">
                {this.props.fields.map(field => 
                    <div className="formField">
                        <label>{field.label}</label> 
                        <div className="formFieldInput">
                            {this.buildFormField(field)}
                        </div>
                    </div>)}
            </div>
         );
    }

    private buildFormField(field: FormField) {
        if (field.type === 'select') {
            return(
                <select
                    id={field.id}
                    value={field.value}
                    className={!this.validateField(field) ?  "invalid-input" : ""}
                    onChange={(e: any) => this.handleFormChange(e, field)}>
                        {field.selectOptions}
                </select>
            )
        }

        return(
            <input 
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e: any) => this.handleFormChange(e, field)}
                pattern={field.validationPattern}
                className={!this.validateField(field) ?  "invalid-input" : ""}
                required/>
        )
    }

    private handleFormChange(e: any, field: FormField ) {
        field.value = e.target.value;
        this.validateField(field);

        for (const field of this.props.fields) {
            const isValid = this.validateField(field)
            this.props.onFieldValidationChanged(isValid);

            if (!isValid) {break;}
        }

        field.onFieldChangedSuccsess(e);
    }

    private validateField(field: FormField): boolean {
        if (field.required && (field.value === undefined || field.value === "" || field.value === 0)) {
            return false;
        }

        if (field.validationPattern && (field.value !== undefined && field.value !== "")) {
            if (!field.value) {
                return false;
            }

            const regex = new RegExp(field.validationPattern);
            if (!regex.test(field.value.toString())) {
                return false;
            }
        }
        return true;
    }
}
