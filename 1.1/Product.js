function Product() {
    this.id = "";
    this.name = "";
    this.description = "";
    this.price = 0;
    this.brand = "";
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = "";
    this.quantity = 0;
    this.date = new Date();
    this.images = [];
    this.reviews = []
    

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

let review = {
    id: "",
    author: "",
    date: new Date(),
    comment: "",
    rating: {},
}
