import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Quiz from '../components/img/quizInterface1.jpeg'
export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1500,
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
        <Slider {...settings}>
            <div>
                <img src={Quiz} />
                <h3>1</h3>
            </div>
            <div>
                <img src={Quiz} />
                <h3>2</h3>
            </div>
            <div>
                <img src={Quiz} />
                <h3>3</h3>
            </div>
            <div>
                <img src={Quiz} />
                <h3>4</h3>
            </div>
            <div>
                <img src={Quiz} />
                <h3>5</h3>
            </div>
            <div>
                <img src={Quiz} />
                <h3>6</h3>
            </div>
        </Slider>
    );
}