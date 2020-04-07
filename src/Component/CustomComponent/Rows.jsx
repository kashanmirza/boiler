
import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Rows extends Component {
    state = {
        count: 0,
        tags : [ 'tag01','tag02','tag03','tag04','tag05']
    };
    Styles ={
     fontSize:13,
     border : '1px red solid',
     margin : '2%'

    };

    render(props) {

        return (
            
                    <td>
                        {
                            props.data  
                        }
                    </td>
                   
        );
    }

   
}
export default Rows; 