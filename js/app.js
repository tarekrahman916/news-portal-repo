
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
  const categoriesContainer = document.getElementById("Categories-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
           <a id="category"   onclick="loadNews('${category.category_id}','${category.category_name}')">${category.category_name}</a>
        `;
    categoriesContainer.appendChild(categoryDiv);
  });
};


//Load all News
const loadNews = async (category_id, categoryName) => {

  toggleSpinner(true); //spinner starts

  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data, categoryName);
  } catch (error) {
    console.log(error);
  }
};


//display News
const displayNews = (allNews, categoryName) => {

  //sort array of allNews
  allNews.sort((a, b) => b.total_view - a.total_view);
  
  //display total news count by category
  const totalNews = document.getElementById("total-news");
  const sortbyViewSection = document.getElementById("sortByView-section");
    
  if (allNews.length === 0) {
    totalNews.classList.remove("d-none");
    totalNews.classList.add("text-danger");
    totalNews.innerHTML = ` <p>No items found for category ${categoryName}</p>`;
    sortbyViewSection.classList.add("d-none");
  } else {
    totalNews.classList.remove("d-none");
    totalNews.classList.remove("text-danger");
    totalNews.innerHTML = ` <p>${allNews.length} items found for category ${categoryName}</p>`;
    sortbyViewSection.classList.remove("d-none");
  }

  //display all news
  const allNewsContainer = document.getElementById("news-container");
  allNewsContainer.innerHTML = ``;
    
  allNews.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card");
    newsDiv.classList.add("mb-3");
    newsDiv.classList.add("p-3");
    newsDiv.innerHTML = `
      <div class="row g-0">
      <div class="col-md-3">
        <div class="text-center">
          <img
            src="${news.thumbnail_url}"
            class="img-fluid rounded-start w-75"
            alt="..."
          />
        </div>
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text text-secondary">
          ${
            news.details.length > 150
              ? news.details.split(" ", 50) + "..."
              : news.details
          } 
          </p>
          <div class="row align-items-center">
            <div class="col-lg-3 col-6">
              <div class="d-flex">
                <img
                  src="${news.author.img}"
                  alt=""
                  class="thumbnail"
                />
                <div class="ms-2">
                  <h6>${
                    news.author.name ? news.author.name : "No Data Available"
                  }</h6>
                  <p class="text-muted">${news.author.published_date}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-6 text-center d-flex ">
               <i class="fa-regular fa-eye me-2"></i>
               <h6>${news.total_view ? news.total_view+'M' : "No Data available"}</h6>
            </div>
            <div class="col-lg-3 col-6">
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div class="col-lg-3 col-6 text-center">
              <button class="btn" data-bs-toggle="modal" data-bs-target="#newsDetails"onclick="loadNewsDetails('${
                news._id
              }')">
                See Details
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
    allNewsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false); //spinner stop 
};

//toggle spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

loadCategories();

loadNews("08", "All News");
