import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, fetchCategories, fetchTypes} from "../../http/productAPI";
import {observer} from "mobx-react";
import '../../App.css'

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchCategories().then(data => product.setCategories(data))
    }, [])

    const filteredCategories = product.categories.filter(
        (category) => !product.selectedType || category.typeId === product.selectedType.id
    );

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('typeId', product.selectedType.id)
            formData.append('categoryId', product.selectedCategory.id)
            formData.append('info', JSON.stringify(info))
            await createProduct(formData).then(() => onHide())
            product.setSelectedType('');
            product.setSelectedCategory('');
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="filter">{product.selectedType.name || "Оберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu className="filter-body">
                            {product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => {
                                        product.setSelectedType(type);
                                        product.setSelectedCategory("");
                                    }}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {product.selectedType.id && ( //
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle className="filter">{product.selectedCategory.name || "Оберіть категорію"}</Dropdown.Toggle>
                            <Dropdown.Menu className="filter-body">
                                {filteredCategories.map(category =>
                                    <Dropdown.Item
                                        onClick={() => product.setSelectedCategory(category)}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введіть ціну"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        className="btn-success"
                        onClick={addInfo}
                    >
                        Додати характеристику
                    </Button>
                    {info?.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введіть назву характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введіть опис характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addProduct}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;