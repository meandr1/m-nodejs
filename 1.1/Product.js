function Product(id,name,description,price,brand,sizes,activeSize,quantity,date,images,reviews) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.images = images;
    this.reviews = reviews;
    

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
}

function Review(id,author,date,comment,rating) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;
}
