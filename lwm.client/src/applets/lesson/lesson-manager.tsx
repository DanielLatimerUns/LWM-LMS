import React, { useEffect, useState } from "react";
import Lesson from "../../entities/domainModels/Lesson";
import RestService from "../../services/network/RestService";
import './lesson-manager.css';
import LessonWizard from "./applets/lesson-wizard/lesson-wizard";
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import spinner from '../../assets/loading_spinner.gif';
import syncIcon from '../../assets/cloud-sync.png'
import azureSyncService from "../../services/network/azure/azureSyncService";
import azureAuthService from "../../services/network/azure/azureAuthService";
import FileUpload from "../../framework/components/fileUpload/fileUpload";

export interface Props {
}

const LessonManager: React.FunctionComponent<Props> = ({}) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson>({name: "", lessonNo: "", id: 0});
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [error] = useState<string | undefined>('All fields required');
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isSyncInProgress, setisSyncInProgress] = useState<boolean>();
    const [isDocumentUploadActive, setIsDocumentUploadActive] = useState<boolean>();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [isDocumentUploadInProgress, setIsDocumentUploadInProgress] = useState<boolean>(false);
    const [isGettingData, setIsGettingData] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>();

    useEffect(() => {
        if (requiresUpdate) {
            setIsGettingData(true);
            getLessons();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate]);

    useEffect(() => {
        setIsGettingData(false);
    }, [lessons])

    const buildActionOptions = () => {
        const options: JSX.Element[] = [
            (
                <LwmButton
                    isSelected={!appletActive}
                    onClick={() => handleActionOptionClicked('records')}
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={() => handleActionOptionClicked('add_edit')}
                    name={(!appletActive ||
                        selectedLesson?.id === 0) ? "Add" :
                        selectedLesson?.name}
                    icon={newIcon}>
                </LwmButton>
            ),
        ];

        if (!appletActive) {
            options.push(
                <LwmButton
                    isSelected={false}
                    onClick={() => syncLessonsWithOneDrive()}
                    name={isSyncInProgress ? "Sync in progress..." : "Sync With OneDrive"}
                    icon={isSyncInProgress ? spinner : syncIcon}>
                </LwmButton>
            );
        }

        if (appletActive && selectedLesson.id !== 0) {
            options.push(
                (
                    <LwmButton
                        isSelected={isDocumentUploadActive ?? false}
                        onClick={() => handleActionOptionClicked('add_document')}
                        name={'Add Document'}
                        icon={newIcon}>
                    </LwmButton>
                ),
            )
        }

        return options;
    }

    const buildGridConfig = () => {
        const columns: GridColumn[] = [
            {lable: "Lesson Name", name: "name"},
            {lable: "Lesson No", name: "lessonNo"}
        ];

        const rows: GridRow[] =
        lessons.map(lesson => ({columnData: lesson, id: lesson.id}));

        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: handleEditClicked,
                handleDeleteClicked: handleDeleteClicked,
            };

        return gridConfig;
    }

    function handleFormChange(changedlesson: Lesson) {
        setSelectedLesson(changedlesson);
    }

    const getLessons = () => {
        if (searchString) {
            RestService.Get(`lesson/${searchString}`).then(
                resoponse => resoponse.json().then(
                    (data: Lesson[]) => {setLessons(data);}
                ).catch(error => console.error(error))
            );
            return;
        }

        RestService.Get('lesson').then(
            resoponse => resoponse.json().then(
                (data: Lesson[]) => {setLessons(data);}
            ).catch(error => console.error(error))
        );
    }

    const handleActionOptionClicked = (action: string) => {
        const lesson: Lesson = {lessonNo: "", name: "", id: 0};

        switch(action) {
            case 'add_edit': {
                if (!isDocumentUploadActive) {
                    setSelectedLesson(lesson);
                }
                setAppletActive(true);
                setIsDocumentUploadActive(false);
            }
            break;
            case 'add_document': {
                setIsDocumentUploadActive(true);
            }
            break;
            case 'records': {
                setAppletActive(false);
            }
            break;
        }
    }

    const handleEditClicked = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setAppletActive(true);
    }

    const handleDeleteClicked = (lesson: Lesson) => {
        RestService.Delete(`lesson/${lesson.id}`).then(() => setRequiresUpdate(true));
    }

    const handleAppletCancel = () => {
        setHasError(false);
        setAppletActive(false);
        setIsDocumentUploadActive(false);
    }

    const handleAppletSave = () => {
        if (hasError) {
            return;
        }

        if (isDocumentUploadActive) {
            handleDocumentUpload();
            return;
        }

        if (selectedLesson?.id === 0) {
            RestService.Post('lesson', selectedLesson).then(() => setRequiresUpdate(true));
            return;
        }

        RestService.Put('lesson',selectedLesson).then(() => setRequiresUpdate(true));
    }

    const handleDocumentUpload = () => {
        if(!selectedFile) {
            return;
        }

        if (!azureAuthService.getCachedAuthToken()) {
            azureAuthService.redirectToAzureUserAuth();
            return;
        }

        setIsDocumentUploadInProgress(true);

        const formData = new FormData();
        formData.append('formFile', selectedFile);
        formData.append('lessonId', selectedLesson.id as any);
        formData.append('name', selectedFile.name);
        formData.append('path', 'AZURE');
        formData.append('documentStorageProvidor', 'Azure')

        RestService.PostForm('document', formData).then(
            () => {
                setIsDocumentUploadActive(false);
                setIsDocumentUploadInProgress(false);
            });
    }

    const handldeSearchChanged = (search: string) => {
        setSearchString(search !== '' ? search : undefined);
        setRequiresUpdate(true);
    }

    const handleValidationChanged = () => (isValid: boolean) => {
        setHasError(isValid);
    }

    const syncLessonsWithOneDrive = () => {
        if (!azureAuthService.getCachedAuthToken()) {
            azureAuthService.redirectToAzureUserAuth();
            return;
        }

        setisSyncInProgress(true);
        azureSyncService.attemptFullSync().then(() =>
            setisSyncInProgress(false),
            _ => azureAuthService.redirectToAzureUserAuth()
        );
    }

    const buildActiveApplet = () => {
        if (isDocumentUploadActive) {
            return <FileUpload
                        isUploading={isDocumentUploadInProgress}
                        description="Select Document"
                        onSelectedFileChanged={(file: File) => setSelectedFile(file)}>
                    </FileUpload>
        }

        return <LessonWizard
                    onChange={handleFormChange}
                    onValidationChanged={handleValidationChanged}
                    lesson={selectedLesson}>
                </LessonWizard>
    }

    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="Lesson Center"
            moduleEntityName="Lesson"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            hasError={hasError}
            error={error}
            appletActive={appletActive}
            onSearchChnaged={handldeSearchChanged}
            isLoading={isGettingData}>
            {buildActiveApplet()}
        </Module>);
};

export default LessonManager;
