import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async (typeId) => {
    const {data} = await $host.get('api/category', {params: {typeId}})
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (typeId, categoryId, page, limit, search) => {
    const { data } = await $host.get('api/product', {
        params: { typeId, categoryId, page, limit, search },
    })
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteOneProduct = async (id) => {
    const { data } = await $host.delete('api/product/' + id);
    return data;
};

export const createReview = async (review) => {
    const {data} = await $authHost.post('api/review', review)
    return data
}

export const fetchReviews = async (userId) => {
    const {data} = await $host.get('api/review/' + userId)
    return data
}