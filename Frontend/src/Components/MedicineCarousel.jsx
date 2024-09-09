import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MDBIcon } from "mdb-react-ui-kit";
import '../Pages/Bootstrap.scss'

const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev" />,
    nextArrow: <button className="slick-next" />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
};

const testimonials = [
    {
        id: 1,
        title: "Great Service",
        description: "I am very satisfied with the customer service.",
        rating: 5,
        image: "https://via.placeholder.com/100",
        name: "John Doe",
        jobtitle: "Software Engineer",
    },
    {
        id: 2,
        title: "Excellent Quality",
        description: "The medicine quality is top-notch. Highly recommended!",
        rating: 4,
        image: "https://via.placeholder.com/100",
        name: "Jane Smith",
        jobtitle: "Pharmacist",
    },
    {
        id: 3,
        title: "Fast Delivery",
        description: "Got my medicines delivered in record time. Great service.",
        rating: 5,
        image: "https://via.placeholder.com/100",
        name: "Alice Johnson",
        jobtitle: "Teacher",
    },
    {
        id: 4,
        title: "User-Friendly Website",
        description: "The website is easy to use, and placing an order was a breeze.",
        rating: 4,
        image: "https://via.placeholder.com/100",
        name: "Bob Brown",
        jobtitle: "Manager",
    },
    {
        id: 5,
        title: "Great Service",
        description: "I am very satisfied with the customer service.",
        rating: 5,
        image: "https://via.placeholder.com/100",
        name: "John Doe",
        jobtitle: "Software Engineer",
    },
    {
        id: 6,
        title: "Excellent Quality",
        description: "The medicine quality is top-notch. Highly recommended!",
        rating: 4,
        image: "https://via.placeholder.com/100",
        name: "Jane Smith",
        jobtitle: "Pharmacist",
    },
    {
        id: 7,
        title: "Fast Delivery",
        description: "Got my medicines delivered in record time. Great service.",
        rating: 5,
        image: "https://via.placeholder.com/100",
        name: "Alice Johnson",
        jobtitle: "Teacher",
    },
    {
        id: 8,
        title: "User-Friendly Website",
        description: "The website is easy to use, and placing an order was a breeze.",
        rating: 4,
        image: "https://via.placeholder.com/100",
        name: "Bob Brown",
        jobtitle: "Manager",
    }
];

export default function App() {

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error loading testimonials.</div>;
    // }

    return (
        <div className="container-fluid" id="Testimonials" style={{ position: 'relative' }}>
            <div className="p-3 mx-auto">
                <Slider {...settings} className="custom-carousel">
                    {testimonials.map((testimonial) => (
                        <div>
                            <div key={testimonial.id} className="bg-white shadow-sm rounded-xl duration-500 hover:scale-105 hover:shadow-xl m-3 h-[400px]">
                                <a href="#">
                                    <img
                                        src={testimonial.image}
                                        alt="avatar"
                                        className="h-1/2 w-full object-cover rounded-t-xl"
                                    />
                                    <div className="px-4 py-3 h-1/2">
                                        <p className="text-lg font-bold text-black truncate block capitalize">{testimonial.title}</p>
                                        <p className="text-muted carousel-description">{testimonial.description}</p>
                                        <div className="flex items-center mt-4">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600 cursor-auto ml-2">{testimonial.jobtitle}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '4%',
                right: '4%',
                borderBottom: '2px solid #DBDDE1',
                zIndex: 10
            }} />
        </div>
    );
}