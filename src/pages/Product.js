import React, {useContext, useEffect, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../http/productAPI";
import {Context} from "../index";
import ReviewCreate from "../components/ReviewCreate";
import '../App.css'

const Product = () => {
    const {user} = useContext(Context)
    const [product, setProduct] = useState({review: [], info: []})
    const {id} = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    useEffect(() => {
        document.title = product.name;
    }, [product.name]);

    const formatPublicationDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };


    return (
        <div className="bg-mobile">
            <Container
                className='background col-lg-7 col-12'
            >
                <Row>
                    <div className="row col-lg-6">
                        <Image
                            className='mt-3 ms-3'
                            src={product.img ? process.env.REACT_APP_API_URL + product.img : ''}
                        />
                    </div>
                    <div
                        className="card fs-5 mt-3 ms-lg-4 me-1 col-lg-5 col-md-12 col-sm-12"
                    >
                        <div
                            className="card-body"
                        >
                            <h3 className="card-title">
                                {product.name}
                            </h3>
                            <hr/>
                            <p className="card-text">
                                <b>Ціна:</b> {product.price} грн
                            </p>
                            <hr/>
                            <p className="card-text">
                                <b>Тип:</b> {product.type && product.type.name}
                            </p>
                            <hr/>
                            <p className="card-text">
                                <b>Категорія:</b> {product.category && product.category.name}
                            </p>
                        </div>
                    </div>
                </Row>
                <div className="card border-light mt-4 ms-3">
                </div>
                <Row className="d-flex flex-column m-lg-3 justify-content-center align-items-center">
                        <h4 className="text-center p-3">Характеристики</h4>
                        {product.info.length > 0 ?
                        <>
                            {product?.info.map((info, index) =>
                                <Row
                                    className="product-card fs-5"
                                    key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'white', padding: 10}}
                                >
                                    {info.title}: {info.description}
                                </Row>
                            )}
                        </>
                            :
                            <h5>
                                Немає додаткових характеристик
                            </h5>
                        }
                        <h4 className='text-center p-3'>Рецензії</h4>
                        {user.isAuth ?
                            <ReviewCreate product={product}/>
                            :
                            <h3>Щоб написати відгук необхідно авторизуватися</h3>
                        }
                        {product.reviews && product.reviews.length > 0 ?
                            product.reviews?.map((review) =>
                                <div className="card product-card text-bg-light mb-1 mt-3 mb-3" key={review.id}>
                                    <div className="card-header"><em>{review.user.name}</em></div>
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">{review.content}</h6>
                                        <hr/>
                                        <p className="card-title"><em>{formatPublicationDate(review.createdAt)}</em></p>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <h3 className='mt-3 mb-4 text-center'>На даний товар ще немає відгуків</h3>
                            )
                        }
                </Row>
            </Container>
        </div>
    );
};

export default Product;