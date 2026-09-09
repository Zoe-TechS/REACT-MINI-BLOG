const usersController = new AbortController(); // Create a new AbortController for the users fetch request
const ordersController = new AbortController(); // Create a new AbortController for the orders fetch request

async function loadUsers() {
  try {
    const response = await fetch("/api/users", {
      signal: usersController.signal,
    });

    const users = await response.json();
    console.log(users);
  } catch (error) {
    if (error.mame === "AbortError") {
      console.log("Userd request cancelled");
      return;
    }

    console.error(error);
  }
}

async function loadOrders() {
  try {
    const response = await fetch("/api/orders", {
      signal: ordersController.signal,
    });

    const orders = await response.json();
    console.log(orders);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Orders request cancelled");
      return;
    }

    console.error(error);
  }
}

loadUsers();
loadOrders();
