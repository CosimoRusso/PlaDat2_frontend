import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard"
import Profile from "./Profile";
import Jobs from "./Jobs";
import Job from "./Job";
import ViewJob from "./ViewJob";
import history from './history';
import ProfileSkills from "./ProfileSkills";
import AppliedInternships from "./AppliedInternships"

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/browsejobs" component={Jobs} />
                    <Route path="/job" component={Job} />
                    <Route path="/viewjob/:jobid" component={ViewJob} />
                    <Route path="/skills" component={ProfileSkills} />
                    <Route path="/appliedinternships" component={AppliedInternships} />
                </Switch>
            </Router>
        )
    }
}