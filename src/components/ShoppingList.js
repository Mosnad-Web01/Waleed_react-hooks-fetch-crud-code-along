import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track component mount status

    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error); // Handle any errors
      }
    };

    fetchItems();

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Runs once after the first render

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (deletedItem) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItem.id)
    );
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
