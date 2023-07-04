import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {check} from "../http/userAPI";
import Row from "react-bootstrap/Row";
import {fetchReviews, fetchProducts} from "../http/productAPI";
import '../App.css'

const User = () => {
    const [, setProduct] = useState('')
    const [user, setUser] = useState('')
    const [review, setReview] = useState([])
    const {id} = useParams()


    useEffect(() => {
        check(id).then((data) => setUser(data));
    }, [id]);

    useEffect(() => {
        if (user.id && !isNaN(Number(user.id))) {
            const userId = Number(user.id);
            fetchReviews(userId).then((data) => setReview(data));
            fetchProducts().then((data) => setProduct(data));
        }
    }, [user.id]);

    useEffect(() => {
        document.title = 'Особистий кабінет';
    }, []);

    const formatPublicationDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="bg-mobile container-lg background min-vh-100 col-lg-7">
                <Row>
                    <div
                        className="card text-bg-success mb-3 mt-3 m-auto d-flex"
                        style={{ width: '780px' }}
                    >
                        <div
                            className="card-header text-center">
                            {user.name}
                        </div>
                        <div className="card-body">
                            <h5
                                className="card-title"
                            >
                                Email
                            </h5>
                            <p
                                className="card-text mb-2"
                            >
                                {user.email}
                            </p>
                        </div>
                    </div>
                    {review && review.length > 0 ? (
                        <>
                            <div className="mb-1 mt-3 w-75 m-auto d-flex">
                                <h4 className="ms-3">Ваші відгуки</h4>
                            </div>

                            {review.map((review) => (
                                <div
                                    className="card text-bg-light mb-3 mt-3 m-auto d-flex"
                                    style={{ width: '780px' }}
                                    key={review.id}
                                >
                                    <div
                                        className="card-header"
                                    >
                                        <em>{review.product.name}</em>
                                    </div>
                                    <div className="card-body">
                                        <h6
                                            className="card-title"
                                        >
                                            {review.content}
                                        </h6>
                                        <hr />
                                        <p
                                            className="card-title"
                                        >
                                            <em>{formatPublicationDate(review.createdAt)}</em>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <h4 className="ms-3">Ви ще не писали відгуки</h4>
                    )}
                </Row>
        </div>
    );
};

export default User;