import Slider from 'react-slick';

export default function CustomSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className='slider-container'>
            <Slider {...settings}>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="slider-1" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="slider-2" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="slider-3" />
                </div>
            </Slider>
        </div>

    )
}