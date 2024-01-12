import React, { Component } from 'react';

class State extends Component {
    state = {
        number: 0,
        foo: {
            bar: 0,
            foobar: 1
        }
    }

    setTestState = () => {
        this.setState({
            number: 0,
            foo: {
                ...this.state.foo,
                foobar: 2
            }
        });
    };
    
    render() {
        return (
            <div>
                <div>foobar:{this.state.foo.foobar}</div>
                <button onClick={this.setTestState}>change</button>
            </div>
        );
    }
}

export default State 