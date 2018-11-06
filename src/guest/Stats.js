import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap'

export default class Stats extends Component {
    render() {

        const { completed } = this.props;

        return (
            <div>
                <div className="title1"> Stats</div>
                <Badge>Completed: {completed}</Badge></div>
        );
    }
}

function mapStateToProps(state) {
    const { completed } = state.guestRequestReducer;
    return {
        completed
    }
}

const connectedStats = connect(mapStateToProps)(Stats);
export { connectedStats as Stats };
