import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions/index';

class GoogleAuth extends React.Component{
   
   state = { isSignedIn: null}

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:
                 '314604630772-dch9e0t9iefqmrei7nji1odecqldd769.apps.googleusercontent.com',
                scope:
                 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get()) //in console gapi.auth2.getAuthInstance().isSignedIn.get()
                this.auth.isSignedIn.listen(this.onAuthChange) 
                //listen _proto_ may hota hy,
                //JS IS PROTOTYPED LANGUAGE using OOP BUT NOT CLASSICALY
                //CLASS K OBJECT BNTE HN CLASS BASED MAY
                //MGR PROTOTYPE BASED MAY OBJECT KO CLONE YA COPY BANATAY HN
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
            // in console gapi.auth2.getAuthInstance().currentUser.get().getId()
        }
        else{
            this.props.signOut();
        }
    }

/*componentDidMount() method As the name suggests,
 after all the elements of the page is rendered correctly,
 this method is called. After the markup is set on the page,
 this technique called by React itself to either fetch the data from 
An External API or perform some unique operations which need the JSX elements.
 */

/* gapi is like generalized api of google client load krwaenge
wo hojaey successfully toh callback func se Id btaenge 
jo 
k console google developer se copy ki thi aur scope
k we just need to access email address for authorization basically it's
initialization,like promise a tap on shoulder by google that after that THEN
is going to provide necessary information*/

onSignInClick = () => {
    this.auth.signIn()
}

onSignOutClick = () => {
    this.auth.signOut()
}

renderAuthButton(){
    if (this.props.isSignedIn === null){
        return null
    } else if (this.props.isSignedIn){ //when isSignedIn is True
        return (
            <button onClick={this.onSignOutClick} className="ui red google button">
            <i className="google icon"/>
                Sign Out
            </button>
        ) //onClick={this.onSignOutClick()} () is liye nahi lagaey q k code replace nahi krna hy
    } else {
        return (
            <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon"/>
                Sign In With Google
            </button>
        )
    }
}


render() {
  return (
    <div>
      {this.renderAuthButton()}
    </div>
  )
}
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }    
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
) (GoogleAuth);