const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProducts() {
    const response = await fetch(
      `${API_URL}/api/products`
    );
  
    return response.json();
  }
  
  export async function getProductById(id: string) {
    const response = await fetch(
      `${API_URL}/api/products/${id}`
    );
  
    return response.json();
  }

  