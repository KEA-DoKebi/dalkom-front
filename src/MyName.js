import React, { Component } from 'react';

class MyName extends Component {
    static defaultProps = {
        name: '기본이름'
    }
    render() {
        return (
            <div>
                Hello! My Name is <b>{this.props.name}</b>.
            </div>
        )
    }
}

// MyName.defaultProps = {
//     name: '기본이름'
// };

export default MyName;