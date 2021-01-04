import React from "react";
import Navbar from "./components/Navbar";
import utils from './utils';
import Job from './Job';

const { get } = utils;

const init = async (self, jobId) => {
    get(`/jobs/findOne/` + jobId)
        .then(res => {
            const job = res.data;
            self.setState({ job });
        });
}

class JobsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null
        }
        this.jobId = this.props.match.params.jobid;
    }

    componentDidMount() {
        init(this, this.jobId).then(() => {});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.jobId = this.props.match.params.jobid;
        const newJobId = prevProps.match.params.jobid;
        if (this.jobId !== newJobId){
            init(this, this.jobId).then(() => {});
        }
    }

    render() {
        return (
            <div>
                <Navbar color="#29B3FF"/>
                <Job job={this.state.job} setJob={job => this.setState({job})}/>
            </div>
        )
    }
};


export default JobsList;