//load all categories
const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

//Display categories
const displayCategories = (categories) => {
  //console.log(categories);
  const categoriesContainer = document.getElementById("Categories-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
           <a id="category"   onclick="loadNews('${category.category_id}','${category.category_name}')">${category.category_name}</a>
        `;
    categoriesContainer.appendChild(categoryDiv);
  });
};

loadCategories();
