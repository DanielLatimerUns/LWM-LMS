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

export interface Props {
}

const LessonManager: React.FunctionComponent<Props> = ({}) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson>({name: "", lessonNo: "", id: 0});
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [error] = useState<string | undefined>('All fields required');
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);

    useEffect(() => {
        if (requiresUpdate) {
            getLessons();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate]);

    const buildActionOptions = () => {
        const options: JSX.Element[] = [
            (
                <LwmButton
                    isSelected={!appletActive}
                    onClick={() => setAppletActive(false)}
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={handleAddClicked}
                    name={(!appletActive ||
                        selectedLesson?.id === 0) ? "Add" :
                        "Edit: " + selectedLesson?.name}
                    icon={newIcon}>
                </LwmButton>
            )
        ];

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
        RestService.Get('lesson').then(
            resoponse => resoponse.json().then(
                (data: Lesson[]) => {setLessons(data);}
            ).catch(error => console.error(error))
        );
    }

    const handleAddClicked = () => {
        const lesson: Lesson = {lessonNo: "", name: "", id: 0};
        setSelectedLesson(lesson);
        setAppletActive(true);
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
    }

    const handleAppletSave = () => {
        if (hasError) {
            return;
        }

        if (selectedLesson?.id === 0) {
            RestService.Post('lesson', selectedLesson).then(() => setRequiresUpdate(true));
            return;
        }

        RestService.Put('lesson',selectedLesson).then(() => setRequiresUpdate(true));
    }

    const handleValidationChanged = () => (isValid: boolean) => {
        setHasError(isValid);
    }

    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="Lesson Center"
            moduleEntityName="Lesson"
            handleCloseClicked={ handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            hasError={hasError}
            error={error}
            appletActive={appletActive}>
            <LessonWizard
                onChange={handleFormChange}
                onValidationChanged={handleValidationChanged}
                lesson={selectedLesson}>
            </LessonWizard>
        </Module>);
};

export default LessonManager;
