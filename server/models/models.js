const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
}, { timestamps: false })

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DOUBLE, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, { timestamps: false })

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, { timestamps: false })

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(Product);

Type.hasMany(Product)
Product.belongsTo(Type)

Category.hasMany(Product)
Product.belongsTo(Category)

Type.hasMany(Category)
Category.belongsTo(Type)

Product.hasMany(ProductInfo, {as: 'info', foreignKey: 'productId'});
ProductInfo.belongsTo(Product, {foreignKey: 'productId'});

module.exports = {
    User,
    Product,
    ProductInfo,
    Type,
    Category,
    Review
}