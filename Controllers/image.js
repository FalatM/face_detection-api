import Clarifai from 'clarifai';
import { response } from 'express';


const app = new Clarifai.App({
    apiKey: '58c062ea6cfa493b9ee3c07a037ac599'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    }).catch(err => res.status(400).json("API is not working."))
}

const imageHandler = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entries'))
}

export {imageHandler, handleApiCall};