import "./fileUpload.css"
import spinner from '../../../assets/loading_spinner.gif'

export interface Props {
    description: string,
    onSelectedFileChanged: Function,
    isUploading: boolean;
}

const FileUpload: React.FunctionComponent<Props> = (props) => {

    const handleSelectedFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) { return; }
        props.onSelectedFileChanged(e.target.files[0]);
    }

    const buildStatusSection = () => {
        if (props.isUploading) {
            return (
                <div className="fileUploadStatusContainer">
                    <label>Uploading...</label>
                    <img src={spinner}></img>
                </div>
            )
        }
        return '';
    }

    return (
    <div className="fileUploadContainer">
        <div className="fileUploadSelectionContainer">
            <label>{props.description}</label>
            <input type={"file"} onChange={handleSelectedFileChanged}></input>
        </div>
        {buildStatusSection()}
    </div>)
}

export default FileUpload;