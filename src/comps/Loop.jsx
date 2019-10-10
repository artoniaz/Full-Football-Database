import React, { Component } from 'react';

class Loop extends Component {
    render() {
        return (
            <div className="loop">
                <i onClick={this.props.toggleActiveSearch} className="fas fa-search"></i>
            </div>
        )
    }
};

export default Loop;
