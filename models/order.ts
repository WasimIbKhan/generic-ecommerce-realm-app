class Order {
  id: string;
  items: Array<{
    productId: string;
    productTitle: string;
    productPrice: number;
    quantity: number;
    sum: number;
  }>;
  totalAmount: number;
  date: Date;

  constructor(
    id: string,
    items: Array<{
      productId: string;
      productTitle: string;
      productPrice: number;
      quantity: number;
      sum: number;
    }>,
    totalAmount: number,
    date: Date
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export default Order;
