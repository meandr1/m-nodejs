function Product(id, name, description, price, brand, activeSize, quantity, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = new Date();
    this.images = images;
    this.reviews = [];

    function setId(id) {
        this.id = id;
    }

    function getID() {
        return this.id;
    }

    function setName(name) {
        this.name = name;
    }

    function getName() {
        return this.name;
    }

    function setDescription(description) {
        this.description = description;
    }

    function getDescription() {
        return this.description;
    }

    function setPrice(price) {
        this.price = price;
    }

    function getPrice() {
        return this.price;
    }

    function setBrand(brand) {
        this.brand = brand;
    }

    function getBrand() {
        return this.brand;
    }

    function setActiveSize(activeSize) {
        this.activeSize = activeSize;
    }

    function getActiveSize() {
        return this.activeSize;
    }

    function setQuantity(quantity) {
        this.quantity = quantity;
    }

    function getQuantity() {
        return this.quantity;
    }

    function setDate(date) {
        this.date = Date.parse(date);
    }

    function getDate() {
        return this.date;
    }

    function addSize(size) {
        size = size.toUpperCase();
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    function deleteSize(size) {
        size = size.toUpperCase();
        if (this.sizes.includes(size)) {
            this.sizes.splice(this.sizes.inexOf(size), 1);
        }
    }

    function addReview(id, author, comment, rating) {
        let review = new Review(id, author, comment, rating);
        if (!this.reviews.includes(review)) {
            this.reviews.push(review);
        }
    }

    function deleteReview(id) {
        for (let i = 0; i < this.reviews.length; i++) {
            if(this.reviews[i].id === id){
                this.reviews.splice(i, 1);
                break;
            }
        }
    }

    function Review(id, author, comment, rating) {
        this.id = id;
        this.author = author;
        this.date = new Date;
        this.comment = comment;
        this.rating = rating;
    }
}