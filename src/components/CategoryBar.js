import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from '../index';
import {Dropdown} from 'react-bootstrap';
import '../App.css'

const CategoryBar = observer(() => {
    const { product } = useContext(Context);

    const filteredCategories = product.categories.filter((category) => {
        if (!product.selectedType || !product.selectedType.id) {
            return true;
        } else {
            return category.typeId === product.selectedType.id;
        }
    });

    return (
        <Dropdown className="mt-2 mb-2 d-flex justify-content-center">

            <Dropdown.Toggle
                className="filter col-11 "
            >
                {product.selectedCategory.name || "Оберіть категорію"}
            </Dropdown.Toggle>

            <Dropdown.Menu className="filter-body col-11 text-lg-start text-center">
                <Dropdown.Item
                    className='list-group-item-light '
                    onClick={() =>
                        product.setSelectedCategory('')
                    }
                >
                    Всі категорії
                </Dropdown.Item>

                {filteredCategories.map(category =>
                    <Dropdown.Item
                        onClick={() =>
                            product.setSelectedCategory(category)
                    }
                        key={category.id}
                    >
                        {category.name}
                    </Dropdown.Item>
                )}

            </Dropdown.Menu>

        </Dropdown>
    );
});

export default CategoryBar;
