import React from 'react'
import Header from '../components/HeaderProfile'
import { getAuth } from 'firebase/auth'
const CreateQuiz = (props) => {
    return (
        <div>
            <Header p={props} />
        </div>
    )
}

export default CreateQuiz
