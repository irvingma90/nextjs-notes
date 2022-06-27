import Container from 'components/container'
import { useRouter } from 'next/router'
import Error from 'next/error'

const Note =({ note, error }) => {
    const Priority = (priority) => {
        if (priority === 1) {
          return 'Alta'
        } else if (priority === 2) {
          return 'Media'
        } else {
          return 'Baja'
        }
      }
    if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.message} />
    return (
        <Container>
            <div className='row'>
                <div className='col-md-6 offset-md-4'>
                    <div className='card' style={{ width: "18rem"}}>
                        <div className="card-header" >
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <div className='card-body' >
                            <p>Priority: {Priority(note.priority)}</p>
                            <p className="card-text">{note.description}</p>
                            <button type="button" className='btn btn-danger'> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)

    if (res.status === 200) {
        const note = await res.json()
        return {
            props: {
                note,
            },
        }
    };

    return {
        props: {
            error:{
                statusCode: res.status,
                message: "Invalid Id"
            }
        }
    }
}

export default Note