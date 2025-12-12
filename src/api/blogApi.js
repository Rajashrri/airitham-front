// src/api/blogApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Add new blog
export const addBlog = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/blog/addblog`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Fetch blog category dropdown options
export const getBlogCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/categoryOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};


// ✅ Get blog by ID (for edit)
export const getBlogById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/blog/getblogByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch blog");
  return response.json();
};

// ✅ Update blog
export const updateBlog = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/blog/updateblog/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};


// ✅ Get all blogs
export const getBlogs = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/getdatablog`);
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

// ✅ Get blog categories for table display
export const getBlogCategoriesForTable = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/getcategoryOptionsTable`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// ✅ Update blog status
export const updateBlogStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/blog/update-statusblog`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Delete blog
export const deleteBlog = async (id) => {
  const response = await fetch(`${BASE_URL}/api/blog/deleteblog/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
