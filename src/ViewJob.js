import React from "react";
import Navbar from "./components/Navbar";
import axios from 'axios';
import Job from './Job';

class JobsList extends React.Component {
    state = {
      job: null
    }

    componentDidMount() {
      axios.get(`https://pladat2.herokuapp.com/api/v1/jobs/findOne/` + this.props.match.params.jobid)
        .then(res => {
          const job = res.data;
          this.setState({ job });
        })
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