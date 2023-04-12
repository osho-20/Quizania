import React, { useState } from 'react'
const DisplayQuestions = (props) => {
    const [quest, setQuestion] = useState(props.q.questions);
    if (quest.length > 0 && quest[Number(0)].id === undefined) {
        quest.shift();
        setQuestion(quest);
    }
    return (
        <div>
            {
                quest?.map((question) => {
                    return (
                        <div id="question-box">
                            <p style={{ color: 'white', textAlign: 'left', margin: '20px' }}>{question?.id}. {question?.description} ({question?.marks} marks)</p>
                            {
                                question?.options?.map((opt) => {
                                    return (
                                        <li style={{ color: 'white', textAlign: 'left', margin: '20px', listStyleType: 'decimal' }}>{opt}</li>
                                    )
                                })
                            }
                            <p style={{ color: 'whitesmoke', textAlign: 'left', margin: '20px' }}>Answer = {question?.answer + ' '}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayQuestions
