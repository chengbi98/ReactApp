import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './BookTable.css';
import { Link } from 'react-router-dom';

function BookTable(props){
    let books = props.books.map(book => {

        let date = book.published.toString().substr(0, 4);
        return (
            <tr key={book.id}>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{date}</td>
                <td><Link to={'/edit/' + book.id}><EditIcon /></Link></td>
                <td><Link onClick={() => { if(window.confirm('Really delete this book?')) props.handleDelete(book.id)} } to='/'><DeleteForeverIcon /></Link> </td>
            </tr>)
    });

    //console.log('render', this.state.books)
    return ( 
        <div>
            <table>
                <tr><th>Author</th><th>Title</th><th>Published</th> </tr>
                {books}
            </table>
        </div>
    );

}

export default BookTable;