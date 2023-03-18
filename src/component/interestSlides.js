import React, { useEffect, useState } from 'react'
import URL from './hobbies'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export default function SimpleSlider(props) {
    const [Image, setImage] = useState([]);
    let ins = props.I.ins;
    const getImage = async () => {
        let data = await URL(ins);
        setImage(data.data.results);
    }
    useEffect(() => {
        getImage();
    }, [ins])
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        rows: 1,
        speed: 500,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 6,
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {Image?.map((images) => {
                return (
                    <div className="images">
                        < img className="programming" src={images.urls.small} />
                        <p style={{color:'whitesmoke', fontSize:'80%' ,fontStyle : 'italic'}}>By : {images?.user?.name ? images?.user?.name : 'Unknown'}</p>
                    </div>
                )
            })}
        </ Slider >
    );
}