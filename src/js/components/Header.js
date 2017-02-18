import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Link to={`/about`}>About</Link>
            </div>
        )
    }
}