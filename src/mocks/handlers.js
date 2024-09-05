import { rest } from "msw";
import { data } from "./data"; // Ensure this file exports your initial items as an array

let items = [...data];
let id = items.length > 0 ? items[items.length - 1].id : 0; // Start ID from 0 if no items

export function resetData() {
  items = [...data];
  id = items.length > 0 ? items[items.length - 1].id : 0; // Reset ID based on initial data
}

export const handlers = [
  rest.get("http://localhost:4000/items", (req, res, ctx) => {
    console.log("Fetching items:", items); // Debugging log
    return res(ctx.json(items));
  }),

  rest.post("http://localhost:4000/items", (req, res, ctx) => {
    const newItem = { id: ++id, ...req.body };
    items.push(newItem);
    console.log("Added item:", newItem); // Debugging log
    return res(ctx.status(201), ctx.json(newItem)); // 201 Created
  }),

  rest.delete("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res(ctx.status(400), ctx.json({ message: "Invalid ID format" })); // 400 Bad Request
    }

    const itemExists = items.some((item) => item.id === parsedId);
    if (!itemExists) {
      return res(ctx.status(404), ctx.json({ message: "Item not found" })); // 404 Not Found
    }

    items = items.filter((item) => item.id !== parsedId);
    console.log("Deleted item with ID:", parsedId); // Debugging log
    return res(ctx.status(204)); // No Content
  }),

  rest.patch("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res(ctx.status(400), ctx.json({ message: "Invalid ID format" })); // 400 Bad Request
    }

    const itemIndex = items.findIndex((item) => item.id === parsedId);
    if (itemIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found" })); // 404 Not Found
    }

    items[itemIndex] = { ...items[itemIndex], ...req.body };
    console.log("Updated item:", items[itemIndex]); // Debugging log
    return res(ctx.json(items[itemIndex])); // Return updated item
  }),
];
