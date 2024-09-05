import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    onUpdateItem({ ...item, isInCart: !item.isInCart });
  }

  function handleDeleteClick() {
    onDeleteItem(item);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
