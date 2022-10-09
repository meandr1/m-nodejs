function Product(id, name, description, price, brand, activeSize, quantity, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = Date.now();
    this.images = images;
    this.reviews = [];

    this.setId = function (id) {
        this.id = id;
    }

    this.getID = function () {
        return this.id;
    }

    this.setName = function (name) {
        this.name = name;
    }

    this.getName = function () {
        return this.name;
    }

    this.setDescription = function (description) {
        this.description = description;
    }

    this.getDescription = function () {
        return this.description;
    }

    this.setPrice = function (price) {
        this.price = price;
    }

    this.getPrice = function () {
        return this.price;
    }

    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.getBrand = function () {
        return this.brand;
    }

    this.setActiveSize = function (activeSize) {
        this.activeSize = activeSize.toUpperCase();
    }

    this.getActiveSize = function () {
        return this.activeSize;
    }

    this.setQuantity = function (quantity) {
        this.quantity = quantity;
    }

    this.getQuantity = function () {
        return this.quantity;
    }

    this.setDate = function (date) {
        this.date = Date.parse(date);
    }

    this.getDate = function () {
        return (new Date(this.date)).toLocaleString();
    }

    this.addSize = function (size) {
        size = size.toUpperCase();
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    this.deleteSize = function (size) {
        size = size.toUpperCase();
        if (this.sizes.includes(size)) {
            this.sizes.splice(this.sizes.indexOf(size), 1);
        }
    }

    this.getSizes = function () {
        return this.sizes;
    }

    this.addReview = function (id, author, comment, service, price, value, quality) {
        let review = new Review(id, author, comment, service, price, value, quality);
        if (!this.reviews.includes(review)) {
            this.reviews.push(review);
        }
    }

    this.getReviewIndex = function (id) {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    this.deleteReview = function (id) {
        let index = this.getReviewIndex(id);
        if (index !== -1) {
            this.reviews.splice(index, 1);
            return true;
        }
        return false;
    }

    this.getReviewByID = function (id) {
        let index = this.getReviewIndex(id);
        if (index !== -1) {
            return this.reviews[index].toString();
        }
        return undefined;
    }

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

        this.toString = function () {
            return `ID: ${this.id}; Author: ${this.author}; Date: ${(new Date(this.date)).toLocaleString()}; Comment: ${this.comment};` +
                `\nRating: Servise - ${this.rating.get('service')}, Price - ${this.rating.get('price')},` +
                ` Value - ${this.rating.get('value')}, Quality - ${this.rating.get('quality')}.`;
        }
    }
}

let product = new Product("123", "Tshirt", "fucking tshirt", 125.55, "BOSS", "M", 100, ["qwe", "rty", "asd", "zxc"]);
console.log(product.getAverageRating());
product.addReview("1", "andrey", "tsirt is bullshit", 1, 2, 3, 4);
product.addReview("2", "roma", "tsirt is bullshit", 2, 2, 2, 2);
product.addReview("3", "kate", "tsirt is bullshit", 3, 3, 3, 3);
product.deleteSize('xl');
product.deleteSize('l');
product.addSize('m');
product.addSize('l');
product.deleteReview('2');
product.setDate('2022-08-07T21:35:15');
console.log(product.getDate());
console.log(product.getReviewByID("1"));
console.log(product.getAverageRating());