import React, { Component , Fragment } from 'react';
import './App.css';
import MyName from './MyName';
import MyName2 from './MyName2';
import Counter from './Counter';
import Counter2 from './Counter2';
import Counter3 from './Counter3';
import Counter4 from './Counter4';
import State from './State';

class Sample extends Component {
    render() {
        const name = 'react';
        const value = 2;
        const style = {
            background: 'black',
            padding: '16px',
            color: 'white',
            fontSize: '12px'
        }
        return (
            <Fragment>
                <div>
                    <input type="text"></input>
                </div>
                <div>Hello</div>
                <div>{name}</div>
                <div>
                    {
                        1 + 1 === 2
                        ? (<div>True</div>)
                        : (<div>False</div>)
                    }
                </div>
                <div>
                    {
                        1 + 1 === 2 && (<div>True</div>)
                    }
                </div>
                <div>
                    {
                        (() => {
                            if (value === 1) return (<div>하나</div>);
                            if (value === 2) return (<div>둘</div>);
                            if (value === 3) return (<div>셋</div>);
                        })()
                    }
                </div>
                <div style={style}>
                    style
                </div>
                <div className="Sample">css 스타일 적용</div>
                <div
                // 태그사이에 주석
                >
                    주석 확인
                </div>
                    {/* 주석 */}
                <MyName name="리액트" />
                <MyName />
                <MyName2 name="함수형" />
                <Counter />
                <Counter2 />
                <Counter3 />
                <Counter4 />
                <State />
            </Fragment>
        );
    }
}

export default Sample;