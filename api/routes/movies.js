const router = require('express').Router();
const Moive = require('../models/Movie')
const verify = require('../verifyToken');

//CREATE
router.post('/',verify, async(req,res)=>{
    if(req.user.isAdmin){
       const newMovie = await Moive(req.body)
       try {
        const savedMovie = await newMovie.save()
        res.status(201).json(savedMovie)
       } catch (error) {
        res.status(500).json(error)
       }
    }else{
        res.status(403).json("You are not allowed!")
    }
})

//UPDATE
router.put('/:id',verify, async(req,res)=>{
    if(req.user.isAdmin){
        try {
        const updatedMovie = await Moive.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedMovie)
       } catch (error) {
        res.status(500).json(error)
       }
    }else{
        res.status(403).json("You are not allowed!")
    }
})

//DELETE
router.delete('/:id',verify, async(req,res)=>{
    if(req.user.isAdmin){
        try {
        await Moive.findByIdAndRemove(req.params.id)
        res.status(200).json("Movie has been deleted...")
       } catch (error) {
        res.status(500).json(error)
       }
    }else{
        res.status(403).json("You are not allowed!")
    }
})

//GET MOVIE
router.get('/find/:id',verify, async(req,res)=>{
        try {
        const movie = await Moive.findById(req.params.id)
        res.status(200).json(movie)
       } catch (error) {
        res.status(500).json(error)
       }
})

//GET RANDOM MOVIE
router.get('/random',verify, async(req,res)=>{
    const type = req.query.type
    let movie;
    try {
    if(type === "series"){
        movie = await Moive.aggregate([
            { $match:{isSeries:true}},
            {$sample:{size:1}}
        ])
    }else{
        movie = await Moive.aggregate([
            { $match:{isSeries:false}},
            {$sample:{size:1}}
        ])
    }
    res.status(200).json(movie)
   } catch (error) {
    res.status(500).json(error)
   }
})

//GET ALL MOVIES
router.get('/',verify, async(req,res)=>{
    if(req.user.isAdmin){
        try {
        const movies = await Moive.find()
        res.status(200).json(movies.reverse())
       } catch (error) {
        res.status(500).json(error)
       }
    }else{
        res.status(403).json("You are not allowed!")
    }
})


module.exports = router;