import React, { Fragment } from "react";
import './module.css';
import LwmButton from "../../../framework/components/button/lwm-button";
import GridColumn from "../../../entities/framework/gridColumn";
import GridRow from "../../../entities/framework/gridRow";
import Grid from "../grid/grid";

export interface Props {
    moduleName: string;
    moduleEntityName: string;
    gridConfig: {
        columns: GridColumn[],
        rows: GridRow[],
        handleEditClicked: Function,
        handleDeleteClicked: Function,
    };
    handleSaveCloseClicked: Function;
    handleCloseClicked: Function;
    options: JSX.Element[];
    children: JSX.Element | JSX.Element[] | undefined;
}
 
export interface State {
}
 
export default class Module extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() { 
        return ( 
            <div className="moduleContainer">
                <div className="moduleHeader">
                    <div className="moduleHeaderTitle">{this.props.moduleName}</div>
                </div>
                <div className="moduleActionSectionContainer">
                    {this.renderOptionsSection()}
                    {this.renderGrid()}
                    {this.props.children}                 
                </div>
            </div>);
    }

    private renderOptionsSection() {
        return(
            <div className="moduleActionSectionOptionContainer">
                {this.props.options}
                {this.renderSaveClose()}
            </div>
        );
    }

    private renderGrid() {
        if ( this.props.children !== undefined)
            return;

        if (this.props?.gridConfig.columns === undefined)
            return;

        return (
        <div className="moduleGridContainer">
            <Grid
                editClicked={this.props.gridConfig.handleEditClicked}
                deletClicked={this.props.gridConfig.handleDeleteClicked}
                columns={this.props.gridConfig.columns} 
                rows={this.props.gridConfig.rows}>
            </Grid>
        </div>);
    }

    private renderSaveClose() {
        if (!this.props.children)
            return;

        return <Fragment>
                    <LwmButton 
                        name="Save & Close" 
                        onClick={this.props.handleSaveCloseClicked.bind(this)} 
                        isSelected={false}/>
                    <LwmButton 
                        name="Cancel & Close" 
                        onClick={this.props.handleCloseClicked.bind(this)} 
                        isSelected={false}/>
                </Fragment>;
    }
}
