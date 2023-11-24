const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connectionPool = require('../database/connection-pool')
const BookRepository = require('../database/book-repository');

let repository = new BookRepository(connectionPool);

// Get a single book
router.get('/:id', function(req, res) {
    repository.get(req.params.id, (err, result)=> {
        if (err) {
            res.status(500),json({ 'error': err.toString() });
        }
        else {
            res.status(200).json(result);
        }
    });
});

// Update
router.put('/:id', function(req, res) {
    repository.update(req.params.id, req.body, (err, result)=> {
        if (err) {
            res.status(500),json({ 'error': err.toString() });
        }
        else {
            res.sendStatus(200);
        }
    });
});

// Delete a book
router.delete('/:id', function(req, res) {
    repository.delete(req.params.id, (err, result)=> {
        if (err) {
            res.status(500),json({ 'error': err.toString() });
        }
        else {
            res.sendStatus(200);
        }
    });
});

// Save book
router.post('/', function(req, res) {
    console.log('post body', req.body);
    repository.save(req.body, (err, result)=> {
        if (err) {
            res.status(500),json({ 'error': err.toString() });
        }
        else {
            res.sendStatus(200);
        }
    });
});

/* get all the books */
router.get('/', function(req, res) {
    repository.getAll((err, result) => {
        if (err) {
            res.status(500),json({ 'error': err.toString() });
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
