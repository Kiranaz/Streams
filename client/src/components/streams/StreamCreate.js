import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../actions';

class StreamCreate extends React.Component{

renderError({error, touched}) { //touched is a boolean value in meta to indicate k input field may value agai
    if(touched && error){
        return(
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
        )
    }
}
    renderInput = ({input, label, meta }) => {
   //console.log(formValues)
   //{input, label, meta } ye destructing hoi v hy
    const className = `field ${meta.error && meta.touched ? 'error': ''} `
        return (
            <div className={className}>
            <label>{label}</label>
             <input {...input} autoComplete='off'/>
             {this.renderError(meta)}
            </div>
         ); 
        }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
        //formValues is formprops, values getting from inputs or all the form values
//plus redux will handle event.preventdefault automatically so that 
//page won't get reload
    }

    render(){
    return(
        <form className="ui form error" 
        onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {/* Redux doesn't know what to show on screen so we have pass
         props as Component and redux will update the state with name of the tags
         fromprops contains every information of the tag
         renderInput(formprops.input) and <input {formprops.input} / >
         but we have used destructuring here in the code */}

            <Field name="title" component={this.renderInput} label="Enter the title" />
            <Field name="description" component={this.renderInput} label="Enter Description"/>
            <button className="ui button primary">Submit</button>
        </form>
    )
}
}

/* field ki name property aur error k object same ho toh it renders input function*/

/* Validation is going to be called every single time that the form
 is initially rendered or the user interacts */

const validate = formValues => {
    const errors = {};

    if(!formValues.title){
        errors.title  = 'You must enter a title'
    }
    if(!formValues.description){
        errors.description = 'You must enter a description'
    }

    return errors;
}

// export default reduxForm({ changing the syntax to combine with connect
 
const formWrapped = reduxForm({
    form: 'streamCreate',
    // validate: validate
    validate
    })    ( StreamCreate);

    //reduxform has same function
    // as of connect but it takes 1 argument


    //NOW we have to combine connect and redux form

    export default connect(null, {createStream})(formWrapped);