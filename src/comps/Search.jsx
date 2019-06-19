import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';

class Search extends Component {

    state = {
        optionValue: "league",
        userValue: "",
    }

    path = "";

    handleSelect = e => {
        const optionValue = e.target.value;
        this.setState({
            optionValue,
        })
    }

    handleInput = e => {
        const userValue = e.target.value;
        this.setState({
            userValue,
        })
    }

    render() {
        const {optionValue} = this.state;
        return (
            <aside className="main__search">
                <h2 className="main__header">search</h2>
                    <label className="main__text">select the category:
                        <select name="categories" id="main__categories" onChange={this.handleSelect} value={optionValue}>
                            {/* <option value="country">country</option> */}
                            <option value="league">league</option>
                            <option value="team">team</option>
                            <option value="player">country</option>
                        </select>
                    </label>
                    <input className="main__input" type="text" placeholder="what are you looking for?" onChange={this.handleInput}/>
                <Link to={this.path} className="main__button">search</Link>
            </aside>
        )
    }

    componentDidUpdate() {
        const {optionValue, userValue} = this.state;
        if (optionValue === "league"){
            this.path = `/league/:${userValue}`
        } else if (optionValue === "team"){
            this.path = `/team/:${userValue}`
        } else {
            this.path = `/player/:${userValue}`
        }
        console.log(this.path);
        
    }
}

export default Search;