import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div>
                <h1>Hello About {this.props.userName}</h1>
                <ul>
                    <li>  <Link to='/'> Home</Link>  </li>
                    <li>  <Link to='/about'><strong>About</strong></Link>  </li>
                    <li>  <Link to='/Practice'>Practice</Link>  </li>
                </ul>
            </div>
        )
    }
}


export default About;