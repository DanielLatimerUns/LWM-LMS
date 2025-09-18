import React, {Fragment, JSX} from "react";
import './module.css';
import LwmButton from "../../../framework/components/button/lwm-button";
import Grid, { GridRow, GridColumn } from "../grid/grid";
import {ButtonConfig} from "../../../entities/framework/lwmButton.ts";

export interface Props {
    moduleName: string;
    moduleEntityName: string;
    gridConfig: {
        columns: GridColumn[],
        rows: GridRow[],
        handleEditClicked: Function,
        handleDeleteClicked: Function,
        customButtons?: ButtonConfig[]
    };
    handleSaveCloseClicked?: Function;
    handleCloseClicked?: Function;
    options: JSX.Element[];
    children: JSX.Element | JSX.Element[] | undefined;
    error?: string;
    altView?: JSX.Element;
    appletActive: boolean;
    fullWidthApplet?: boolean;
    onSearchChnaged?: Function;
    isLoading: boolean;
}

export interface State {
}

export type { GridColumn, GridRow }
export default class Module extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    private searchDeBounce: number = 0;

    render() {
        return (
            <div className="moduleContainer">
                <div className="moduleActionSectionContainer">
                    {this.renderView()}
                    {this.renderApplet()}
                </div>
            </div>);
    }

    private renderApplet() {
        if (!this.props.children || !this.props.appletActive) { return;}
        return (
            <div className="moduleActionSectionAppletBackground">
                <div className="moduleActionSectionApplet">
                    <div className={this.props.fullWidthApplet ? "moduleActionSectionAppletContentFullWidth" : "moduleActionSectionAppletContent"}>
                        {this.props.children}
                        <div className="moduleActionSectionAppletFooter">
                            {this.buildError()}
                            <div className="moduleActionSectionAppletFooterButtons">
                                {this.renderSaveClose()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    private buildError() {
        if (this.props.error) {
            return(
                <div className="moduleError">
                    {this.props.error}
                </div>
            )
        }
        return "";
    }

    private buildModuleActionSection() {
        if (this.props.onSearchChnaged) {
            return (<div className="moduleActionSectionSearchContainer">
                        {this.renderOptionsSection()}
                        <div>
                            <img src="https://img.icons8.com/?size=100&id=2sWrwEXiaegS&format=png&color=000000"/>
                            <input type="text" placeholder="Search..." onChange={this.handleSearchChanged.bind(this)}/>
                        </div>
                    </div>)
        }

        return (<div className="moduleActionSectionSearchContainer">
                    {this.renderOptionsSection()}
                </div>)
    }

    private renderOptionsSection() {
        return(
            <div className="moduleActionSectionOptionContainer">
                {this.props.options}
            </div>
        );
    }

    private renderView() {
        if (this.props.altView) {
            return (
                <div className="moduleAppletView">
                    {this.buildModuleActionSection()}
                    <div className="moduleAppletViewContainer">
                        {this.props.altView}
                    </div>
                </div>
            );
        }

        if (this.props?.gridConfig.columns === undefined)
            return;

        return (
        <div className="moduleGridContainer">
            {this.buildModuleActionSection()}
            <Grid
                isDataLoading={this.props.isLoading}
                editClicked={this.props.gridConfig.handleEditClicked}
                deleteClicked={this.props.gridConfig.handleDeleteClicked}
                columns={this.props.gridConfig.columns}
                customButtons={this.props.gridConfig.customButtons}
                rows={this.props.gridConfig.rows}>
            </Grid>
        </div>);
    }

    private renderSaveClose() {
        if (!this.props.children)
            return;
        
        const buttons: JSX.Element[] = [];
        
        if (this.props.handleSaveCloseClicked) {
            buttons.push(<LwmButton
                name="Save & Close"
                onClick={this.props.handleSaveCloseClicked.bind(this)}
                isSelected={false}/>);
        }
        
        if (this.props.handleCloseClicked) {
            buttons.push(                    <LwmButton
                name="Close"
                onClick={this.props.handleCloseClicked.bind(this)}
                isSelected={false}/>);
        }

        return (<Fragment>{buttons}</Fragment>);
    }

    private handleSearchChanged(searchEvent: any) {
        clearTimeout(this.searchDeBounce);

        this.searchDeBounce = setTimeout(() => {
            if (!this.props.onSearchChnaged) {return;}

            this.props.onSearchChnaged(searchEvent.target.value);
        }, 300)
    }
}
