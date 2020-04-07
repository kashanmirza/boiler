
import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Table extends Component {
    state = {
        count: 0,
        tags : [ 'tag01','tag02','tag03','tag04','tag05']
    };
    Styles ={
     fontSize:13,
     border : '1px red solid',
     margin : '2%'

    };

    render() {

        return (
            <div>
                <h1>                    Hellow to the future ..!    </h1>
                <div>
                <span style ={this.Styles}>  {this.formatCount()} </span>
                    <table>
                    <tr>
                        {
                            this.state.tags.map( item => <li key={item} >{item}</li>  )
                        }
                    </tr>
                    </table>
                    
                    
                </div>

            </div >
        );
    }

    formatCount() {
        const count = this.state.count;
        return count === 0 ? <h3>No rows found..</h3> : <h3> {count}  rows fatched..</h3>;
    }
}
export default Table; 