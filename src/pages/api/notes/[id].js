import {dbConnect} from 'config/database'
import Note from 'models/Note'

dbConnect();

export default async (req, res) => {

    const {method, body, query: {id}} = req;

    switch (method) {
        case "GET":
            try {
                const note = await Note.findById(id);
                if (!note) return res.status(404).json({error: "Task no found"});
                return res.status(200).json(note);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const updatedNote = await Note.findByIdAndUpdate(id, body, {new: true});
               if (!updatedNote) return res.status(404).json({error: "Task no found"});
               return res.status(204).json();
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "DELETE":
            try {
               const deletedNote = await Note.findByIdAndDelete(id);
               if (!deletedNote) return res.status(404).json({error: "Task no found"});
               return res.status(204).json();
            } catch (error) {
                return res.status(400).json({error: error.message});
            }
        default:
            break;
    }
}