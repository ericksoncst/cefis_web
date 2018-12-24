import React, { Component } from 'react'
import axios from 'axios';

import './Style.css';


class Body extends Component {
    
    state = {
        courses: [],
        isLoaded: false
    }   


    componentDidMount() {
        axios.get('https://cefis.com.br/api/v1/event')
        .then(res => {

            let arr = Object.values(res);
            console.log(arr)

            this.setState({
                isLoaded: true,
                courses: arr[0].data
            });
        })
        .catch(err => console.log(err));
    }


  render() {

    var { isLoaded, courses } = this.state;

    if(!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="div-body">
                <p>Choose one course and improove your skills for free!!</p>
                <div>
                    <ul>
                        {courses.map(c => (
                            <li className="courses-list" key={c.id}>
                                <p className="title" >Titulo: {c.title}</p>
                                <img className="banner" src={c.banner}></img>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
  }

}

export default Body;