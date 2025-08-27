import React, { Fragment } from "react";
import './module.css';
import LwmButton from "../../../framework/components/button/lwm-button";
import Grid, { GridRow, GridColumn } from "../grid/grid";

export interface Props {
    moduleName: string;
    moduleEntityName: string;
    gridConfig: {
        columns: GridColumn[],
        rows: GridRow[],
        handleEditClicked: Function,
        handleDeleteClicked: Function,
        customButtons?: LwmButton[]
    };
    handleSaveCloseClicked?: Function;
    handleCloseClicked?: Function;
    options: JSX.Element[];
    children: JSX.Element | JSX.Element[] | undefined;
    error?: string;
    altView?: JSX.Element;
    appletActive: boolean;
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

                {this.renderOptionsSection()}
                <div className="moduleActionSectionContainer">
                    {this.renderView()}
                    {this.renderApplet()}
                </div>
            </div>);
    }

    private renderApplet() {
        if (!this.props.children || !this.props.appletActive) { return;}

        return (
            <div className="moduleActionSectionApplet">
                <div className="moduleActionSectionAppletContent">
                    <div className="moduleActionSectionAppletHeader">
                        {this.renderSaveClose()}
                    </div>
                    {this.props.children}
                    {this.buildError()}
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

    private buildSearch() {
        if (this.props.onSearchChnaged) {
            return (<div className="moduleActionSectionSearchContainer">
                        <input type="text" placeholder="Search..." onChange={this.handleSearchChanged.bind(this)}/>
                    </div>)
        }
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
            return (<div className="moduleAppletViewContainer">
            {this.props.altView}
             </div>);
        }

        if (this.props?.gridConfig.columns === undefined)
            return;

        return (
        <div className="moduleGridContainer">
            {this.buildSearch()}
            <Grid
                isDataLoading={this.props.isLoading}
                editClicked={this.props.gridConfig.handleEditClicked}
                deletClicked={this.props.gridConfig.handleDeleteClicked}
                columns={this.props.gridConfig.columns}
                customButtons={this.props.gridConfig.customButtons}
                rows={this.props.gridConfig.rows}>
            </Grid>
        </div>);
    }

    private renderSaveClose() {
        if (!this.props.children)
            return;

        if (!this.props.handleSaveCloseClicked || !this.props.handleCloseClicked) {
            return "";
        }

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

    private handleSearchChanged(searchEvent: any) {
        clearTimeout(this.searchDeBounce);

        this.searchDeBounce = setTimeout(() => {
            if (!this.props.onSearchChnaged) {return;}

            this.props.onSearchChnaged(searchEvent.target.value);
        }, 300)
    }
}
