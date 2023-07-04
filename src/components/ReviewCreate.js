import React, {useEffect, useState} from 'react';
import {createReview} from "../http/productAPI";
import {useParams} from "react-router-dom";
import {check} from "../http/userAPI";

const ReviewCreate = ({product}) => {
    const [content, setContent] = useState('')
    const [user, setUser] = useState('')
    const {id} = useParams()

    useEffect(() => {
        check(id).then(data => setUser(data)).then()
    }, [])

    const addReview = () => {
        const formData = new FormData()
        formData.append('productId', product.id)
        formData.append('userId', user.id)
        formData.append('content', content)
        createReview(formData).then(() => {window.location.reload()})
    }

    return (
        <div className="card text-bg-light p-3 product-card fs-5">
            <div
                className="card-header">
                <em>{user.name}</em>
            </div>
            <li
                className="list-group-item"
            >
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="recenseAria"
                        className="form-label"
                    >
                        <em><b>Напишіть відгук</b></em>
                    </label>
                    <textarea
                        className="form-control bg-light border-dark text-dark"
                        id="recenseAria1"
                        rows="3"
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
            </li>
            <li
                className="list-group-item"
            >
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={addReview}
                >
                    Запостити
                </button>
            </li>
        </div>
    );
};

export default ReviewCreate;