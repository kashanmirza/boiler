
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

class Practice extends Component {
    state = {
        count: 0,
        tags: ['tag01', 'tag02', 'tag03', 'tag04', 'tag05']
    };
    Styles = {
        fontSize: 13,
        border: '1px red solid',
        margin: '2%'

    };

    render() {

        return (
            <div>
                <h1>                    Hellow to the future ..!    </h1>
                <ul>
                    <li>  <Link to='/'> Home</Link>  </li>
                    <li>  <Link to='/about'>About</Link>  </li>
                    <li>  <Link to='/Practice'><strong>Practice</strong></Link>  </li>
                </ul>
                <div>
                    <span style={this.Styles}>  {this.formatCount()} </span>
                    <input type='button' text='Reset' value='Reset' />
                    <ul>
                        {
                            this.state.tags.map(item => <li key={item} >{item}</li>)
                        }
                    </ul>
                </div>

            </div >
        );
    }

    formatCount() {
        const count = this.state.count;
        return count === 0 ? 'Zero' : count;
    }
}
export default Practice; 