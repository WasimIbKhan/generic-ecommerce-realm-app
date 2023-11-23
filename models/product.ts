class Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number; // Changed from number to string as your prices are strings
  product_id: string;
  weighted_rating: number;
  category: string;
  discounted_price: number;
  actual_price: number;
  discount_percentage: string;
  rating: number;
  rating_count: string;
  about_product: string;
  user_id: string;
  user_name: string;
  review_id: string;
  review_title: string;
  review_content: string;
  product_link: string;

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number,
    product_id: string,
    weighted_rating: number,
    category: string,
    discounted_price: number,
    actual_price: number,
    discount_percentage: string,
    rating: number,
    rating_count: string,
    about_product: string,
    user_id: string,
    user_name: string,
    review_id: string,
    review_title: string,
    review_content: string,
    product_link: string
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.product_id = product_id;
    this.weighted_rating = weighted_rating;
    this.category = category;
    this.discounted_price = discounted_price;
    this.actual_price = actual_price;
    this.discount_percentage = discount_percentage;
    this.rating = rating;
    this.rating_count = rating_count;
    this.about_product = about_product;
    this.user_id = user_id;
    this.user_name = user_name;
    this.review_id = review_id;
    this.review_title = review_title;
    this.review_content = review_content;
    this.product_link = product_link;
  }
}

export default Product;
