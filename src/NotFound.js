import React, { Component } from 'react';

class NotFound extends Component {
 
    render() { 

        const divStyle = {
            width: '80%'
        };

        return(
            <div>
            <div className="ui segment">
                <div class="container">
                <div class="row">
                    <div class="col-md-4"><h2 style={{float: "left" }}>Hello. Unfortunately, you are in no man's land :(.</h2></div>
                    <div style={{ clear: "left"}} class="col-md-4 offset-md-4"><h4>Your current progress: In the negatives.</h4></div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default NotFound;