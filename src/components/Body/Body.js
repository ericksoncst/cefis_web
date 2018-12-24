import React, { Component } from 'react'
import axios from 'axios';

import './Style.css';


class Body extends Component {
    
    state = {
        courses: [],
        isLoaded: false,
        search: ''
    }   

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0,20)});
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

    let { isLoaded, courses } = this.state;
    let filteredCourses = courses.filter(
        (course) => {
            return course.title.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1;
        }
    );

    if(!isLoaded) {
        return <div className="div-loading">Loading...</div>
   
    } else {
        return (
            <div className="div-body">
                <p>Escolha um curso e aumente suas habilidades de graça!!</p>
                <div>

                    <div className="div-filter">
                        <i className="fas fa-search"></i>
                        <input placeholder=" O que está procurando?"
                        className="filter" type="text" 
                        value={this.state.search} 
                        onChange={this.updateSearch.bind(this)}/>
                    </div>

                    <ul>
                        {filteredCourses.map(c => (
                            <li className="courses-list" key={c.id}>
                                <p className="title" >{c.title}</p>
                                <img className="banner" src={c.banner}></img>
                                <a>Detalhes do curso</a>
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