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
        const isFormValid = this.validateAllFields();
        this.props.onFieldValidationChanged(isFormValid);
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

        const isChangedFieldValid = this.validateField(field);
        this.props.onFieldValidationChanged(isChangedFieldValid);

        if (!isChangedFieldValid) {
            return;
        }

        this.props.onFieldValidationChanged(this.validateAllFields(field.id))

        field.onFieldChangedSuccsess(e);
    }

    private validateAllFields(fieldToExclude?: string) {
        for (const field of this.props.fields) {
            if (fieldToExclude && field.id === fieldToExclude) {
                continue;
            }

            const isValid = this.validateField(field)
            if (!isValid) { 
                return false; 
            }
        }

        return true;
    }

    private validateField(field: FormField): boolean {
        if (field.required && 
            (field.value === undefined || 
                field.value === "" || 
                field.value === "-1" || 
                field.value === -1 || 
                field.value === null ||
                Number.isNaN(field.value))) {
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
