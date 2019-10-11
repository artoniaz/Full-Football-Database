
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';

class Bear extends Component {

    state = {
        number: 0,
        text: "",
    };

    addLetter = () => {
        const { sentence } = this.props;
        if (this.state.number >= sentence.length) return;
        let text = this.state.text;
        text += sentence[this.state.number];
        this.setState({
            number: this.state.number + 1,
            text
        });
    };

    componentDidMount() {
        this.timeout = setTimeout(() => this.interval = setInterval(this.addLetter, 60), 6000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                    <div className="bear__number">1</div>
                </div>
                <p dangerouslySetInnerHTML={{ __html: this.state.text }}></p>
                {this.props.showArrow && <FontAwesomeIcon icon={faLongArrowAltDown} className="bear__arrow" />}
            </div>
        )
    }
};

export default Bear;
