import React from "react";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export default function SimpleSlider(props) {
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <div className="images">
                <a href="https://www.codechef.com/users/yash_0627" target="blank"><img className="programming" src={props.Img.CC} alt="logo" />
                    <h1>CodeChef</h1></a>
            </div>
            <div className="images">
                <a href="https://codeforces.com/profile/OSHO_20" target="blank"><img className="programming" src={props.Img.CF} alt="logo" />
                    <h1>CodeForces</h1></a>
            </div>
            <div className="images">
                <a href="https://www.interviewbit.com/profile/yash_27" target="blank"><img className="programming" src={props.Img.IB} alt="logo" />
                    <h1>InterviewBit</h1></a>
            </div>
            <div className="images">
                <a href="https://leetcode.com/Osho_2020/" target="blank"><img className="programming" src={props.Img.LC} alt="logo" />
                    <h1>LeetCode</h1></a>
            </div>
        </ Slider >
    );
}