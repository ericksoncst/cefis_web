import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import loading from './loading.gif';

import './Style.css';


class Body extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            course: {},
            isLoaded: false,
            search: '',
            id: '',
            open: false,
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.onBtnClick = this.onBtnClick.bind(this);
    }   

    fireCourseById = async function(e){
        let id =  await e.target.value;
        await this.setState({ id });
        await this.callApi();
        await this.onOpenModal();
    }

    callApi = async function() {
        let url = `https://cefis.com.br/api/v1/event/${this.state.id}`;
        var response = await axios.get(url);
        let course = response.data.data;
        await this.setState({course});
    }

    onBtnClick = function(e) {
        e.preventDefault();
        this.fireCourseById(e);
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0,20)});
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };


    componentDidMount() {
        axios.get('https://cefis.com.br/api/v1/event/')
        .then(res => {
            this.setState({
                isLoaded: true,
                courses: res.data.data
            });
        })
        .catch(err => console.log(err));

    }


  render() {

    let { isLoaded, courses, course, open  } = this.state;
    let filteredCourses = courses.filter(
        (course) => {
            return course.title.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1;
        }
    );

    if(!isLoaded) {
        return <div className="div-loading">
            <p>LOADING...</p>
            <img alt="" src={loading}></img>
        </div>
   
    } else {
        return (
            <div className="div-body">
                <p>ESCOLHA UM CURSO E AUMENTE SUAS HABILIDADES DE GRAÇA!!</p>
                <div className="underline"></div>
                <div>

                    <div className="div-filter">
                        <i className="fas fa-search"></i>
                        <input placeholder=" O que está procurando?"
                        type="text" 
                        value={this.state.search} 
                        onChange={this.updateSearch}/>
                    </div>

                    <ul>
                        {filteredCourses.map(c => (
                            <li className="courses-list" key={c.id}>
                                <p className="title" >Titulo: {c.title}</p>
                                <img className="banner" alt="" src={c.banner}></img>
                                <button
                                 onClick={this.onBtnClick} value={c.id}>Detalhes do curso</button>
                            </li>
                        ))}

                        <Modal open={open} onClose={this.onCloseModal} center>
                            <div className="modal-img">
                                <img alt="" src={course.banner}>
                                </img>
                            </div>
                            <div className="modal-courses">
                                <p>Categoria: <label>{course.category}</label></p><br/>
                                <p>Objetivo: <label>{course.goal}</label></p><br/>
                                <p>Grade currícular: <label>{course.resume}</label></p><br/>
                                <p>Instrutor: <label>{course.teachers_names}</label></p>
                            </div>
                        </Modal>
                    </ul>
                </div>
            </div>
        );
    }
  }

}

export default Body;