import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import TypeBar from '../components/TypeBar';
import ProductList from '../components/ProductList';
import { observer } from 'mobx-react';
import { Context } from '../index';
import { fetchTypes, fetchProducts, fetchCategories } from '../http/productAPI';
import Pages from '../components/Pages';
import CategoryBar from '../components/CategoryBar';
import '../App.css';

const Main = observer(() => {
    const { product } = useContext(Context);
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchTypes().then((data) => product.setTypes(data));
        fetchCategories().then((data) => product.setCategories(data));
        fetchProducts(null, null, 1, 8).then((data) => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, []);

    useEffect(() => {
        fetchProducts(
            product.selectedType.id || '',
            product.selectedCategory.id || '',
            product.page,
            8
        ).then((data) => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, [product.page, product.selectedType, product.selectedCategory]);

    useEffect(() => {
        fetchProducts(null, null, null, null, value).then((data) => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, [value, product]);

    useEffect(() => {
        document.title = 'ProductReview';
    }, []);

    return (
        <div>
            <Row className="mt-2">
                <Col className="col-lg-2 col-12 d-flex justify-content-center">
                    <div className="align-items-center  justify-content-center col-12 col-lg-10 mt-lg-3">
                        <form
                            className="border-5 d-flex justify-content-center mb-3"
                            role="search"
                        >
                            <input
                                className="search form-control"
                                type="search"
                                placeholder="Пошук..."
                                aria-label="Search"
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </form>
                        <TypeBar />
                        <CategoryBar />
                    </div>
                </Col>
                <Col className="align-items-center col-12 col-lg-9">
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </div>
    );
});

export default Main;
