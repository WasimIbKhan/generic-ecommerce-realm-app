# Importing necessary libraries
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

# Load the dataset
df = pd.read_csv('Amazon_Sales_Data.csv')

# Check for missing values in the 'about_product' column and drop them
df = df.dropna(subset=['about_product'])

# Using a subset for demonstration
df_subset = df.head(500)

# Feature extraction from product descriptions
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df_subset["about_product"])

# Fitting K-Means to the dataset
kmeans = KMeans(n_clusters=10, init='k-means++', max_iter=100, n_init=1)
y_kmeans = kmeans.fit_predict(X)

# Assigning clusters to the dataframe
df_subset['cluster_id'] = y_kmeans

# Recommendation function
def show_recommendations(product):
    Y = vectorizer.transform([product])
    prediction = kmeans.predict(Y)
    cluster_products = df_subset[df_subset['cluster_id'] == prediction[0]].head(5)
    
    print(f"Recommended products for:\n{product}\n")
    for _, row in cluster_products.iterrows():
        print(f"Product ID: {row['product_id']}")
        print(f"Price: {row['discounted_price']}")
        print(f"Image URL: {row['img_link']}")
        print(f"Description: {row['about_product']}\n")
        print('-'*60)

# Example recommendation
# You can replace the argument with any product description from your dataset
show_recommendations("hdmi cable for 4K video streaming")

