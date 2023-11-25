import React from 'react';
import './Book.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

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

        this.state = {
            author: '',
            title: '',
            published: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {

//        this.showMessage('Something went wrong.');

        for(let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if(!value.match(rule)) {
                console.log(field, rule, message, value);
                this.showMessage(message);
                return false;
            }
        }

        return true;
    }

    showMessage(message) {
        this.setState({ message: message});

        setTimeout(()=>{
            this.setState({message: ''});
        }, 3000);
    }

    handleSubmit(event) {

        event.preventDefault();

        if (!this.validate())
        {
            return;
        }

        console.log(this.state);
        let { author, title, published } = this.state;
        published += '-01-01';

        const book = {
            author: author,
            title: title,
            published: published,
        }

        axios.post(process.env.REACT_APP_SERVER_URL, book)
            .then(result => {
                //console.log(result);
                this.setState( { created: true } );
            })
            .catch(error =>{
                console.log(error);
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

                    <div className='message'>{this.state.message}</div>
                </form>

            </div>
        );
    }

}
export default Book;