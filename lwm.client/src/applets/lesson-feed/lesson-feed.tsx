import React from "react";
import RestService from "../../services/network/RestService";
import './lesson-feed.css';
import LessonFeedModel from "../../entities/app/lessonFeed";
import LessonDashboard from "../lesson-dashboard/lesson-dashboard";

interface LessonFeedProps {
}
 
interface LessonFeedState {
    feed: LessonFeedModel;
}
 
export default class LessonFeed extends React.Component<LessonFeedProps, LessonFeedState> {
    constructor(props: LessonFeedProps) {
        super(props);
        this.state = { feed: {lessons: []}};
    }

    componentDidMount(): void {
        this.getFeed();
    }
    
    render() { 
         return (
            <div className="lessonFeed">
                {this.state.feed.lessons.map(lesson => <LessonDashboard dashboardModel={lesson}></LessonDashboard>)}
            </div> 
        )
    }


    private getFeed() {
        RestService.Get('lessonschedule/feed').then(
            resoponse => resoponse.json().then(
                (data: LessonFeedModel) => this.setState(
                    {feed: data})
            ).catch( error => console.error(error))
        );
    }
}
 