import Container from 'components/container'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'


export default function NewNoteForm() {

    const {query, push} = useRouter();

    const [Note, setNote] = useState({
        title: '',
        description: '',
        priority: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        query.id ? await updateNote() : await createNote()
        await push('/')
    };

    const createNote = async () => {
        try {
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Note)

            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateNote = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${query.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Note)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>  setNote({ ...Note, [e.target.name]: e.target.value })

    const getNote = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${query.id}`)
            const note = await res.json()
            setNote(note)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (query.id) getNote()
    }, [])

    return (
        <Container>
            <div className='row'>
                <div className='col-md-6 offset-md-4'>
                    <div className='card mt-4 mb-3' style={{ width: "26rem"}}>
                        <div className="card-header" >
                            <h5 className="card-title">{query.id ? 'Update Note' : 'Add new note'}</h5>
                        </div>
                        <div className='card-body' >
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className='font-weight-bold' htmlFor="title" >Title:</label>
                                    <input type="text" className="form-control" id="title" name="title" placeholder="Title" required maxLength="40" onChange={handleChange} value={Note.title}/>
                                    <label className='font-weight-bold mt-3' htmlFor="description">Description:</label>
                                    <textarea className="form-control" id="description" rows="3" name="description" required maxLength="200" onChange={handleChange} value={Note.description}></textarea>
                                    <label className='font-weight-bold mt-3' htmlFor="priority">Priority:</label>
                                    <select className="form-control" id="priority" name="priority" required onChange={handleChange} value={Note.priority}>
                                        <option value="">Select priority</option>
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                    </select>
                                    <button  type="submit" className="btn btn-primary font-weight-bold mt-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
