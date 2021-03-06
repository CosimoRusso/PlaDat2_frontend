import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard"
import Profile from "./Profile";
import Jobs from "./Jobs";
import Job from "./Job";
import ViewJob from "./ViewJob";
import EditJob from "./EditJob";
import history from './history';
import ProfileSkills from "./ProfileSkills";
import AppliedInternships from "./AppliedInternships";
import CompanyProfile from "./CompanyProfile";
import ListOfStudents from "./components/Company/ListOfStudents";
import CompanyDashboard from "./components/Company/CompanyDashboard";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/student/profile/:studentId" component={Profile} />
                    <Route path="/student/profile/" component={Profile} />
                    <Route path="/browsejobs" component={Jobs} />
                    <Route path="/job" component={Job} />
                    <Route path="/viewjob/:jobid" component={ViewJob} />
                    <Route path="/editjob/:jobid" component={EditJob} />
                    <Route path="/student/skills/:studentId" component={ProfileSkills} />
                    <Route path="/student/skills" component={ProfileSkills} />
                    <Route path="/student/appliedinternships" component={AppliedInternships} />
                    <Route path="/company/profile" component={CompanyProfile} />
                    <Route path="/company/job/:jobId/listofstudents" component={ListOfStudents}/>
                    <Route path="/company/dashboard" component={CompanyDashboard}/>
                </Switch>
            </Router>
        )
    }
}