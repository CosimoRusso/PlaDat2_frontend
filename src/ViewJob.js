import React from "react";
import Navbar from "./components/Navbar";
import axios from 'axios';
import Job from './Job';

const init = async (self, jobId) => {
    axios.get(`https://pladat2.herokuapp.com/api/v1/jobs/findOne/` + jobId)
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
    <Navbar/>
    <Job job={this.state.job}/>
    </div>
  )
}
};


export default JobsList;