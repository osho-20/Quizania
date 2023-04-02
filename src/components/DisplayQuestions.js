import React, { useState } from 'react'

const DisplayQuestions = (props) => {
    const [quest, setQuestion] = useState(props.q.questions);
    console.log(quest);
    return (
        <div>
            {
                quest?.map((question) => {
                    return (
                        <div id="question-box">
                            <p style={{ color: 'white', textAlign: 'left', margin: '20px' }}>{question?.id}.) {question?.description} ({question?.marks} marks)</p>
                            {
                                question?.options?.map((opt) => {
                                    return (
                                        <li style={{ color: 'white', textAlign: 'left', margin: '2px', listStyleType: 'decimal' }}>{opt}</li>
                                    )
                                })
                            }
                            <p>Answer = {question?.answer + ','}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayQuestions
