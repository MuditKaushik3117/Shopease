export async function getProducts() {
    const response = await fetch(
      "http://localhost:5000/api/products"
    );
  
    return response.json();
  }
  
  export async function getProductById(id: string) {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`
    );
  
    return response.json();
  }

  