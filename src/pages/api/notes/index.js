import {dbConnect} from 'config/database';
import Note from 'models/Note'

dbConnect();

export default async function handler(req, res) {

  const { method, body} = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find().sort({ priority: 1,  createdAt: -1 });
        return res.status(200).json(notes);
      } catch (error) {
        return res.status(500).json({error: error.message});
      }
    case "POST":
      try {
        const newNote = new Note(body);
        const savedNote = await newNote.save()
        return  res.status(201).json(savedNote);
      } catch (error) {
        return res.status(500).json({error: error.message});
      }
    default:
      return res.status(400).json({msg: "This method is not supported"});
  }

  
  }
  