import React from 'react';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="col-lg-3 col-md-6 col-12 p-3">

            <div
                className="card card-item cursor-pointer"
                onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
            >

                <div className="justify-content-center align-items-center"></div>

                <img
                    className="card-img-top rounded-4 mt-1 p-1"
                    style={{height: '14rem', objectFit: 'contain'}}
                    src={product?.img ? process.env.REACT_APP_API_URL + product.img : ''}
                />
                <div className="card-body background">

                    <h4 className="card-title text-center text-decoration-underline">{product.name}</h4>

                    {product.reviews.length > 0
                        ?
                        <h6 className="text-center review-quantity">Кількість рецензій: {product.reviews.length}</h6>
                        :
                        <h6 className="text-center review-quantity">Немає рецензій</h6>
                    }

                </div>

            </div>

        </div>
    );
};

export default ProductItem;
