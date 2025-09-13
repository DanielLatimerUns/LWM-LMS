import React from "react";
import Spinner from "../../../assets/loading_spinner.gif";
import "./loading.css";

interface Props {
    isVisible: boolean;
}
const Loading: React.FunctionComponent<Props> = (props: Props) => {
    if (!props.isVisible) {
        return "";
    }
    return (
        <div className="loadingContainer">
            <img src={Spinner}/>
        </div>
    );
}

export default Loading;