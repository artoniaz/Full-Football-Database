
import React, { Component } from 'react';

class Bear extends Component {

    state = {
        number: 0,
        text: ""
    };

    sentence = "Hey! I'm here to help you. Just choose the country you are interested in and then, the league you wish. Accept with 'choose' button";

    addLetter = () => {
        let txt = this.state.text;
        txt += this.sentence[this.state.number];
        this.setState({
            number: this.state.number + 1,
            txt
        });
    };

    componentDidUpdate() {
        this.addLetter();
    }

    componentDidUpdate() {
        if (this.state.number <= this.sentence.length) {
            setInterval(this.addLetter(), 20);
        }
    }

    render() {
        return (
            <div className="bear__frame">
                <div className="bear__head">
                    <div className="bear__mouth"></div>
                    <div className="bear__eye bear__eye--first"></div>
                    <div className="bear__eye bear__eye--second"></div>
                </div>
                <div className="bear__ear bear__ear--first"></div>
                <div className="bear__ear bear__ear--second"></div>
                <div className="bear__body">
                    <div className="bear__hand bear__hand--first"></div>
                    <div className="bear__hand bear__hand--second"></div>
                    <div className="bear__paw bear__paw--first"></div>
                    <div className="bear__paw bear__paw--second"></div>
                    <div className="bear__flag" style={{ backgroundImage: `url(${this.props.flag})` }} ></div>
                </div>
                <p innerHTML={this.state.text}></p>
            </div>
        )
    }
};

export default Bear;
