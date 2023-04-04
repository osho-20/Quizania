import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import Quiz from '../components/Quiz'
const CreateQuiz = (props) => {
    return (
        <div>
            <Header p={props} />
            <div className='create'>
                <form className="create-quiz">
                    <Quiz />
                </form>
            </div>
        </div>
    )
}

export default CreateQuiz
