import React from 'react';
import './Book.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import FlashMessage from './FlashMessage';

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
//import { param } from '../../server/routes/books';
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params, props }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }


class Book extends React.Component {

    validation = {
        author: {
            rule: /^\S.{0,48}\S$/,
            message: 'Author field must have 2-50 characters'
        },
        title: {
            rule: /^\S.{0,68}\S$/,
            message: 'Title field must have 2-70 characters'
        },
        published: {
            rule: /^\d{4}/,
            message: 'Published field must be a 4-digit year'
        },
    }

    constructor(props) {
        super(props);

//        let params = useParams();
//        let bookId = params.id;
        console.log(props);

        const bookId = window.location.href.split('/')[4]
        console.log(bookId);

//        let bookId = props.params.id;

        this.state = {
            id: bookId, // props.match.params.id,
            author: '',
            title: '',
            published: '',
            warningCount: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(!this.state.id) {
            return;
        }
        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
            .then(result => {
                let { author, title, published } = result.data[0];

                this.setState( { 
                    author: author,
                    title: title,
                    published: published.substr(0, 4)
                });
            })
            .catch(error => {
                console.log(error);
                this.warning("Unable to load book.");
            });
    }

    warning(message) {
        this.setState({ message: message, warningCount: this.state.warningCount + 1 });

    }

    validate() {

//        this.showMessage('Something went wrong.');

        for(let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if(!value.match(rule)) {
                console.log(field, rule, message, value);
                this.warning(message);
                return false;
            }
        }

        return true;
    }

    handleSubmit(event) {

        event.preventDefault();

        if (!this.validate())
        {
            return;
        }

        console.log(this.state);
        let { id, author, title, published } = this.state;
        published += '-01-01';

        const book = {
            id: id,
            author: author,
            title: title,
            published: published,
        }

        let updateFunc = axios.post;
        let url = process.env.REACT_APP_SERVER_URL;

        if(id) {
            updateFunc = axios.put;
            url += '/' + id;
        }

        //axios.post(process.env.REACT_APP_SERVER_URL, book)
        updateFunc(url, book)
            .then(result => {
                //console.log(result);
                this.setState( { created: true } );
            })
            .catch(error =>{
                console.log(error);
                this.warning("Unable to save book")
            });

    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    render() {

//    console.log('server url', process.env.REACT_APP_SERVER_URL);
        console.log(this.state); 
        if(this.state.created) {
            return <Navigate to="/" />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}> 
                    <label htmlFor='author'>Author:</label>
                    <input value={this.state.author} onChange={this.handleChange} type='text' name='author' id='author'/>
                    <label htmlFor='title'>Title:</label>
                    <input value={this.state.title} onChange={this.handleChange} type='text' name='title' id='title'/>
                    <label htmlFor='published'>Published:</label>
                    <input value={this.state.published} onChange={this.handleChange} type='text' name='published' id='published'/>
                    <input type='submit' value="Save"/>

                    <FlashMessage key={this.state.warningCount} message={this.state.message} duration='3000'/>
                </form>

            </div>
        );
    }

}
export default withRouter(Book);