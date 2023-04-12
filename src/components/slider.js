import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Quiz from '../components/img/quizInterface1.jpeg'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
export default function SimpleSlider(props) {
    const auth = getAuth();
    const db = getDatabase();
    const [quizs, steQuizs] = useState({ details: [] });
    const get = async () => {
        const docref = doc(firestore, 'creaters', auth.currentUser.uid);
        const document = await getDoc(docref);
        if (document.exists()) {
            const key = document.data().quizs;
            key?.map((k) => {
                const refer = ref(db, 'Quiz/' + k);
                onValue(refer, (snap) => {
                    const data = snap.val();
                    const Name = data.QuizName;
                    const code = data.Quizid;
                    let arr = quizs.details;
                    arr.push({ k, Name, code });
                    steQuizs({ ...quizs, details: arr });
                })
            })
        }
    }
    useEffect(() => {
        get();
    }, []);
    var settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    initialSlide: 6
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <h1 >My Quiz</h1>
            <Slider {...settings}>
                {
                    quizs?.details?.map((key) => {
                        return (
                            <div>
                                <img src={Quiz} style={{ padding: '20px' }} />
                                <p style={{ color: 'white', fontFamily: 'Poppins', margin: '0px' }}>{key.Name.toUpperCase()}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <CopyToClipboard text={key.code} style={{ width: '100px' }}>
                                        <button >Code</button>
                                    </CopyToClipboard>
                                    <Link to={'/edit=' + auth.currentUser.displayName + '/' + key.k + '/Quiz=edit'} ><button style={{ width: '100px' }} onClick={(e) => { props.p.props[1](key.k) }}>Edit </button></Link>
                                </div>
                                <button onClick={(e) => { props.p.props[3](key.code) }}><Link to='/result=true' style={{ textDecoration: 'none', color: 'black' }}>Result</Link></button>
                            </div>
                        )
                    })
                }
            </Slider >
        </div >


    );
}