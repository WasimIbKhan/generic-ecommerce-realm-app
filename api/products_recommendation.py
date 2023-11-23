import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def convert_to_json(product):
    product['_id'] = str(product['_id'])  # Convert ObjectId to string
    return product

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    product_id = request.json['product_id']

    MONGODB_URI = os.environ.get('MONGODB_URI')
    # Connect to MongoDB
    client = MongoClient(MONGODB_URI)
    db = client.ecommerceDB
    collection = db.products
    
    print(f"Fetching recommendations for {product_id}")
    # Fetch the cluster_id of the given product
    product = collection.find_one({"product_id": product_id})
    
    # Check if the product exists
    if product is None:
        client.close()
        return jsonify({"error": "Product not found"}), 404

    cluster_id = product['cluster_id']

    # Fetch 5 other products from the same cluster
    recommended_products = list(collection.find({"cluster_id": cluster_id, "product_id": {"$ne": product_id}}).limit(5))
    
    # Convert each product to a JSON-serializable format
    recommended_products = [convert_to_json(prod) for prod in recommended_products]

    client.close()

    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
