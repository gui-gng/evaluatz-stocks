import React from 'react';
import './profile.css';


class Profile extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="evaluatz_profile">
                <div className="">
                   <h1>{this.props.match.params.username}</h1> 
                   
                </div>

            </div>
        )
    }
}
export default Profile
