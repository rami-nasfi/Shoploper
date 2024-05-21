import React, { useState, useEffect } from "react";
import axios from "axios";

function Modal({ itemEdit, handleAddItem, setX }) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setText(itemEdit.text || "");
    setLink(itemEdit.link || "");

    // Fetch categories, products, and pages from the database
    fetchCategories();
    fetchProducts();
    fetchPages();
  }, [itemEdit]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/category/6642101140e95cb20fd92176");
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      if (res.data && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pages");
      if (res.data && Array.isArray(res.data)) {
        setPages(res.data);
      } else {
        setPages([]);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {itemEdit.index ? "Edit Item" : "New Item"}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="item-text" className="col-form-label">
                  Text:
                </label>
                <input type="text" className="form-control" id="item-text" value={text} onChange={(e) => setText(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="item-link" className="col-form-label">
                  Link:
                </label>
                <select className="form-select" id="item-link" value={link} onChange={(e) => setLink(e.target.value)}>
                  <option value="">Link</option>
                  <optgroup label="Categories">
                    {categories.map((category, index) => (
                      <option key={category._id} value={`category/${category._id}`}>
                        {category.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Products">
                    {products.map((product) => (
                      <option key={product._id} value={`product/${product._id}`}>
                        {product.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Pages">
                    {pages.map((page) => (
                      <option key={page._id} value={`page/${page._id}`}>
                        {page.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setX({})}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleAddItem(text, link, itemEdit.index)}>
              {itemEdit.index ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
