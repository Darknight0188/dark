var express = require('express');
var router = express.Router();
var Book = require('../modal/book.modal');

router.get('/',async function(req, res, next){
    let books = await Book.find()
    res.render('index', { books: books })
});

router.post('/',function(req, res, next){
    var newbook = new Book()
    newbook.title = req.body.title;
    newbook.description = req.body.description;
    newbook.author = req.body.author;
    newbook.save().then(function (err){
        if(err) { console.log(err) }
    })
    res.redirect('/')
});

router.get('/update',function(req, res, next){
    res.render('./update')
})

router.post('/update', function(req, res, next){
    var id = req.body.id;
    Book.findById(id, function(err, book){
        if(err){console.log(err)}
        book.title = req.body.title
        book.description = req.body.description
        book.author = req.body.author
        book.save()
    })
    res.redirect('/')
})

router.post('/delete', function(req, res, next){
    var id = req.body.id
    Book.findByIdAndDelete(id, function(err){
        if(err){console.log(err)}
    })
    res.redirect('/')
})

module.exports = router;