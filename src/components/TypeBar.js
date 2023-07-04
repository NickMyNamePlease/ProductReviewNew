import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";
import '../App.css'


const typeBar = observer(() => {
    const { product } = useContext(Context)

    return (
        <Dropdown className="mt-2 mb-2 d-flex justify-content-center">

            <Dropdown.Toggle
                className="filter col-11"
            >
                {product.selectedType.name || 'Оберіть тип'}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="filter-body col-11 text-lg-start text-center"
            >
                <Dropdown.Item
                            className='list-group-item-light list-group-item-action'
                            onClick={() => {
                                product.setSelectedType('');
                                product.setSelectedCategory('');
                            }}
                >
                    Всі типи
                </Dropdown.Item>

                {product.types.map(type =>
                    <Dropdown.Item
                        onClick={() => product.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </Dropdown.Item>
                )}

            </Dropdown.Menu>

        </Dropdown>
    )
})

export default typeBar;