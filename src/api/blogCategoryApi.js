// src/api/blogCategoryApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchBlogCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/getdatablogcategory`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const addBlogCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/addblogcategory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateBlogCategory = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/updateblogcategory/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteBlogCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/deleteblogcategory/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getBlogCategoryById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/getblogcategoryByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateBlogCategoryStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/blogcategory/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
