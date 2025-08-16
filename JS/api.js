import axios from 'axios';


export async function fetchBooksByCategory(category, limit = 20, offset = 0) {
  try {
    const formattedCategory = category.trim().toLowerCase(); 
    const url = `https://openlibrary.org/subjects/${encodeURIComponent(formattedCategory)}.json?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);

    
    if (!response.data.works || response.data.works.length === 0) {
      console.warn(`No books found for category: ${formattedCategory}`);
      return [{ title: "No books found", authors: [{ name: "" }], cover_id: null }];
    }

    return response.data.works;
  } catch (error) {
    console.error("Error fetching category:", error);
    return [{ title: "No books found", authors: [{ name: "" }], cover_id: null }];
  }
}



export async function fetchBookDescription(bookKey) {
  try {
    const url = `https://openlibrary.org${bookKey}.json`;
    const response = await axios.get(url);
    const data = response.data;
   
    if (typeof data.description === 'string') return data.description;
    if (data.description && typeof data.description.value === 'string') return data.description.value;
    return "No description available.";
  } catch (error) {
    console.error("Error fetching description:", error);
    return "Error loading description.";
  }
}
