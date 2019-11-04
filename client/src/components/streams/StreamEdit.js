import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
    // console.log(props) ye props router dom se mil rha hy
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues)
}

    render(){
        if(!this.props.stream) {
        return <div>StreamEdit</div> }

        return(
            <div>
                <h3>Edit A Stream</h3>
                <StreamForm 
                    initialValues = { _.pick(this.props.stream, 'title', 'description' )}
                    onSubmit = { this.onSubmit }
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
     return {
         stream: state.streams[ownProps.match.params.id]
     }
}


export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

//ownProps k through we can access props coming from
//router dom unless you can't use props under mapStateToProps
//state se hmko puri streamlist mil rhi hy mgr ownProps se  jo
//id milrhi hy wo pass krenge to get that specific stream