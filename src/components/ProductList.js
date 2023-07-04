import ProductItem from "./ProductItem";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "../index";

const ProductList = observer(() => {
    const { product } = useContext(Context);

    return (
        <div className="row">
            {product.products?.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
});

export default ProductList;
