import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# %matplotlib inline
plt.style.use("ggplot")

import sklearn
from sklearn.decomposition import TruncatedSVD

df = pd.read_csv('../data/Amazon_Sales_Data.csv')
amazon_sales_data = amazon_sales_data.dropna()
amazon_sales_data.head()

amazon_sales_data['rating'] = pd.to_numeric(amazon_sales_data['rating'], errors='coerce')

# Calculate C, the mean rating across all products
C = amazon_sales_data['rating'].mean()

# Calculate the number of ratings for the 50th percentile (you can adjust this threshold)
m = amazon_sales_data['product_id'].value_counts().quantile(0.5)

# Filter out products that have a number of ratings below the threshold
qualified_products = amazon_sales_data.groupby('product_id').filter(lambda x: len(x) >= m)

# Compute the average rating and rating count for each product
average_ratings = qualified_products.groupby('product_id')['rating'].mean()
rating_counts = qualified_products.groupby('product_id')['rating'].count()

# Calculate the weighted rating for each product using the IMDb formula
weighted_ratings = ((rating_counts / (rating_counts + m) * average_ratings) + 
                    (m / (rating_counts + m) * C))

# Sort products by weighted rating in descending order
most_popular = weighted_ratings.sort_values(ascending=False)

