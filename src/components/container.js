import Head from 'next/head'
import Navigation from './navigation'


const Container = (props) => (
    <div>
        <Head>
            <title>Next.js || Notes App</title>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/flatly/bootstrap.min.css'></link>
        </Head>
        <Navigation/>
        <div className="container mx-auto mt-4">
            {props.children}
        </div>
        
    </div>
)

export default Container;