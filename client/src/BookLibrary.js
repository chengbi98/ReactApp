import React from 'react';
import axios from 'axios';
import './BookLibrary.css';
import BookTable from './BookTable';
import FlashMessage from './FlashMessage';

class BookLibrary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            loading: false,
            error: false,
            warning: '',
            warningCount: 0,
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {

        this.setState( {error: false, loading: true});

        axios(process.env.REACT_APP_SERVER_URL)
        .then(result => this.setState( { loading: false, books: result.data } ))
        .catch(error =>
            {
                this.setState({ error: true, loading: false });
//                console.log(error);
            });
    }

    handleDelete(id) {
        console.log('delete', id);

        axios.delete(process.env.REACT_APP_SERVER_URL + '/' + id)
            .then(result => {
                console.log(result);
                this.refresh();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    warningCount: this.state.warningCount + 1,
                    warning: 'Delete failed',
                });
            })
    }

    render() {
        let content = '';
        if(this.state.loading) {
            content = <div className='library-message'>Loading ...</div>
        }
        else if(this.state.error) {
            content = <div className='library-message'>An error occured, please try later ...</div>            
        }
        else {
            content = 
                (
                    <div className='book-library'>
                        <FlashMessage key={this.state.warningCount} message={this.state.warning} duration='3000'/>
                        <BookTable books={this.state.books} handleDelete={this.handleDelete} />
                    </div>
                )
        }
        return content;
    }
}

export default BookLibrary;
