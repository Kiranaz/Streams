import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component{

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
        //formValues is formprops, values getting from inputs or all the form values
//plus redux will handle event.preventdefault automatically so that 
//page won't get reload
    }

    render(){
    return(
        <div>
            <h3>Create A Stream</h3>
            <StreamForm onSubmit={ this.onSubmit } />
        </div>
    )
}
}

export default connect(
    null,
    { createStream })(StreamCreate)