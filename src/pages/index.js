import Container from 'components/container'
import Link from 'next/link'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useRouter} from 'next/router'

//Frontend..
export default function Home({ notes }) {

  const router = useRouter();

  const Priority = (priority) => {
    if (priority === 1) {
      return {"text":'High', "class":'text-danger font-weight-bold'}
    } else if (priority === 2) {
      return {"text":'Medium', "class":'text-success font-weight-bold'}
    } else {
      return {"text":'Low', "class":'text-success font-weight-bold'}
    }
  }

  const datetimeDiff = (date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const diffDays = Math.floor(diff / (1000 * 3600 * 24))
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return diffDays + ' day ago'
    } else {
      return diffDays + ' days ago'
    }
  }

  const handleDelete = async (id) => {
    confirmAlert({
      message: 'Are you sure to delete this note?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await deleteNote(id)
            await router.push('/')
          }
        },
        {
          label: 'No',
          onClick: () => {
            return
          }
        }
      ]
    })
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  if(notes.length === 0) return (
    <Container>
      <div className='row'>
        <div className='col text-center'>
          <div>
            <img src='https://img.freepik.com/vector-gratis/ilustracion-concepto-fallo-conexion_114360-536.jpg' alt='empty' />
          </div>
          <div className='mb-4'>
            <Link href='/notes/new'>
              <a className="btn btn-success btn-lg">New Note</a>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
  return (
    <Container>
        <h1>Notes Available</h1>
        <Link href="/notes/new">
            <a className="btn btn-success mt-4 btn-lg">New Note</a>
        </Link>
          <div className="row ">
          {notes.map(note => (
            <div className="col-md-4 sm-8 mt-4 mb-2">
              <div className="card" style={{ width: "22rem"}} key={note._id}>
                <div className="card-header d-flex justify-content-between">
                  <h5 className="card-title p-2">{note.title}</h5>
                </div>
                <div className="card-body" >
                  <p className={Priority(note.priority).class}>Priority: {Priority(note.priority).text}</p>
                  <p className="card-text">{note.description}</p>
                  <small className="text-muted">{datetimeDiff(note.createdAt)}</small>
                  <div className='mt-3 d-flex justify-content-between'>
                      <Link href={`/notes/${note._id}`}>
                        <a className="card-link btn btn-secondary">Edit</a>
                      </Link>
                        <button className="card-link btn btn-danger" onClick={() => handleDelete(note._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
    </Container>
  );
}

//Backend..
export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`);
  const notes = await res.json();
  return {
    props: {
      notes
    }
  }
}
