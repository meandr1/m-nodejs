
/**
 * Constructor describes some product with its properties and methods
 * @param {String} id - product ID
 * @param {String} name - product name
 * @param {String} description - product description
 * @param {number} price - product price
 * @param {String} brand - product brand
 * @param {String} activeSize - product active size
 * @param {number} quantity - product quantity
 * @param {Array [String]} images - array of product images
 */
function Product(id, name, description, price, brand, activeSize, quantity, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = parseInt(quantity);
    this.date = Date.now();
    this.images = images.map(item => item.toLowerCase());
    this.reviews = [];

    /**
     * Method sets product ID
     */
    this.setId = function (id) {
        this.id = id;
    }

    /**
     * Method gets product ID
     */
    this.getId = function () {
        return this.id;
    }

    /**
     * Method sets product name
     */
    this.setName = function (name) {
        this.name = name;
    }

    /**
     * Method gets product name
     */
    this.getName = function () {
        return this.name;
    }

    /**
     * Method sets product description
     */
    this.setDescription = function (description) {
        this.description = description;
    }

    /**
     * Method gets product description
     */
    this.getDescription = function () {
        return this.description;
    }

    /**
     * Method sets product price
     */
    this.setPrice = function (price) {
        this.price = price;
    }

    /**
     * Method gets product price
     */
    this.getPrice = function () {
        return this.price;
    }

    /**
     * Method sets product brand
     */
    this.setBrand = function (brand) {
        this.brand = brand;
    }

    /**
     * Method gets product brand
     */
    this.getBrand = function () {
        return this.brand;
    }

    /**
     * Method sets active product size
     */
    this.setActiveSize = function (activeSize) {
        this.activeSize = activeSize.toUpperCase();
    }

    /**
     * Method gets active product size
     */
    this.getActiveSize = function () {
        return this.activeSize.toUpperCase();
    }

    /**
     * Method sets product quantity
     */
    this.setQuantity = function (quantity) {
        if(Number.isInteger(quantity))
        this.quantity = quantity;
        else console.log("Please enter an integer quantity.")
    }

    /**
     * Method gets product quantity
     */
    this.getQuantity = function () {
        return this.quantity;
    }

    /**
     * Method sets date of product creation
     */
    this.setDate = function (date) {
        let temp = Date.parse(date); 
        if (isNaN(temp)) {
            console.log("Please use standard date patterns, as: YYYY-MM-DDTHH:mm:ss")
        } else {
            this.date = temp;
        }
    }

    /**
     * Method gets date of product creation
     */
    this.getDate = function () {
        return (new Date(this.date)).toLocaleString();
    }

    /**
     * Method adds size to product sizes array
     */
    this.addSize = function (size) {
        size = size.toUpperCase();
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    /**
     * Method deletes size from product sizes array
     */
    this.deleteSize = function (size) {
        size = size.toUpperCase();
        if (this.sizes.includes(size)) {
            this.sizes.splice(this.sizes.indexOf(size), 1);
        }
    }

    /**
     * Method gets an array of product sizes
     */
    this.getSizes = function () {
        return this.sizes;
    }

    /**
     * Method adds image by name in product images array
     * @param {String} image - image name 
     */
    this.addImage = function (image) {
        image = image.toLowerCase();
        if (!this.images.includes(image)) {
            this.images.push(image);
        }
    }

    /**
     * Method deletes image by its name from product images.
     * @param {String} image - image name 
     * @returns true in case of successful deleting, otherwise false.
     */
    this.deleteImage = function (image) {
        image = image.toLowerCase();
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i] === image) {
                this.images.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Method is searching images in this.images array.
     * @param {String} image - part of image name
     * @returns First image in array if parameter image is undefined, image in case of finding an image,
     *          otherwise - null.
     */
    this.getImage = function (image) {
        image = image.toLowerCase();
        if (image === undefined) return this.images[0];
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].includes(image)) {
                return this.images[i];
            }
        }
        return undefined;
    }

    /**
     * Method adds a new Review object in this.reviews array.
     * @param {String} id - id of current review
     * @param {String} author - author of review
     * @param {String} comment - comment of product
     * @param {number} service - user rate of service
     * @param {number} price - user rate of price
     * @param {number} value - user rate of value
     * @param {number} quality - user rate of quality
     */
    this.addReview = function (id, author, comment, service, price, value, quality) {
        let review = new Review(id, author, comment, service, price, value, quality);
        if (!this.reviews.includes(review)) {
            this.reviews.push(review);
        }
    }

    /**
     * Method finds an index of current review in product field "reviews"
     * @param {String} id - id of review
     * @returns index of review in Product.reviews array. If the review wasn't found it returns -1.
     */
    this.getReviewIndex = function (id) {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Method deletes review by its ID
     * @param {String} id - id of review 
     * @returns true in case of successful finding and deleting review, otherwise - false.
     */
    this.deleteReview = function (id) {
        let index = this.getReviewIndex(id);
        if (index !== -1) {
            this.reviews.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Method gets a review of product ID of review
     * @param {String} id of review
     * @returns review by ID
     */
    this.getReviewByID = function (id) {
        let index = this.getReviewIndex(id);
        if (index !== -1) {
            return this.reviews[index].toString();
        }
        return undefined;
    }

    /**
     * Method gets an average rating of product by rates service, price, values, quality of all users
     */
    this.getAverageRating = function () {
        if (this.reviews.length === 0) return undefined;
        let sumRating = 0;
        let items = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            for (let rate of this.reviews[i].rating.values()) {
                sumRating += rate;
                items++;
            }
        }
        return sumRating / items;
    }

    /**
     * Constructor describes a Review object
     * @param {String} id - id of current review
     * @param {String} author - author of review
     * @param {String} comment - comment of product
     * @param {number} service - user rate of service
     * @param {number} price - user rate of price
     * @param {number} value - user rate of value
     * @param {number} quality - user rate of quality
     */
    function Review(id, author, comment, service, price, value, quality) {
        this.id = id;
        this.author = author;
        this.date = Date.now();
        this.comment = comment;
        this.rating = new Map([
            ['service', service],
            ['price', price],
            ['value', value],
            ['quality', quality]
        ]);

        /**
         * Method converts Review object to String format
         */
        this.toString = function () {
            return `ID: ${this.id}; Author: ${this.author}; Date: ${(new Date(this.date)).toLocaleString()}; Comment: ${this.comment};` +
                `\nRating: Service - ${this.rating.get('service')}, Price - ${this.rating.get('price')},` +
                ` Value - ${this.rating.get('value')}, Quality - ${this.rating.get('quality')}.`;
        }
    }
}

/**
 * Function finds products which is match to search string by name or description
 * @param {Product} products - array of products to search in
 * @param {String} search  is a text to search
 * @returns array of products matched search parameter
 */
function searchProducts(products, search) {
    search = search.toLowerCase();
    let result = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].getName().toLowerCase().includes(search) ||
            products[i].getDescription().toLowerCase().includes(search)) {
            result.push(products[i]);
        }
    }
    return result;
}

/**
 * Function sorts an input array of products by price, by name or by ID
 * @param {Product} products - array to sort
 * @param {String} sortRule - is a parameter of which sorting goes by
 */
function sortProducts(products, sortRule) {
    switch (sortRule.toLowerCase()) {
        case 'price': {
            products.sort((a, b) => a.getPrice() - b.getPrice());
            break;
        }
        case 'name': {
            products.sort((a, b) => a.getName().localeCompare(b.getName()));
            break;
        }
        case 'id': {
            products.sort((a, b) => a.getId().localeCompare(b.getId()));
            break;
        }
    }
}