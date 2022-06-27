import {Schema, model, models} from 'mongoose'

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength:[40, 'Title must be less than 40 characters' ]
    },
    description: {
        type: String,
        required:[true, 'Description is required'],
        trim: true,
        maxlength:[200, 'Description must be less than 200 characters' ]
    },
    priority: {
        type: Number,
        required: [true, 'Priority is required'],
        min: [1, 'Priority must be greater than 1'],
        max: [3, 'Priority must be less than 3']
    }
}, {
    timestamps: true
})

export default models.Note || model('Note', noteSchema);