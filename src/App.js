import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import Resume from './components/Resume.js';
import Contact from './components/Contact.js';
import Portfolio from './components/Portfolio.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'./resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Resume data={this.state.resumeData.resume}/>
        <Portfolio data={this.state.resumeData.portfolio}/>
        <Contact data={this.state.resumeData.main} repos={this.state.resumeData.portfolio}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;

