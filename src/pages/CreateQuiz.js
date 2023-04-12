import React from 'react'
import Header from '../components/HeaderProfile'
import Quiz from '../components/Quiz'
const CreateQuiz = (prop) => {
    const props = prop.props;
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
