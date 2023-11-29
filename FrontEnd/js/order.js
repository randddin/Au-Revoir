const orderForm = document.getElementById("orderForm");
let productsData = []; // Store product data globally

// Function to add row to the table
function addRow() {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>
      <select class="select-product-ordered" name="product_ordered" class="form-control">
        ${generateOptionsHTML()} <!-- Generate options here -->
      </select>
    </td>
    <td>
      <input class="form-control" type="number" name="quantity"
        required oninvalid="this.setCustomValidity('Data yang diisikan belum lengkap, silahkan lengkapi terlebih dahulu')" oninput="setCustomValidity('')">
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteRow(this)">-</button>
    </td>
  `;

  tableBody.appendChild(newRow);
}

// Function to generate options HTML for the select element
function generateOptionsHTML() {
  let optionsHTML = '';

  for (const product of productsData) {
    optionsHTML += `<option value="${product.id}">${product.name}</option>`;
  }

  return optionsHTML;
}

// Fetch product data when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://be-jayapura-8-aurevoir.up.railway.app/products")
    .then((response) => response.json())
    .then((data) => {
      productsData = data.productsData; // Store product data globally
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Function to delete row from the table
function deleteRow(button) {
  const tableRow = button.parentElement.parentElement;
  tableRow.remove();
}

// Function to send the order to the server
async function sendOrderToServer(order) {
  try {
    const response = await fetch("https://be-jayapura-8-aurevoir.up.railway.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.order_id;
    } else {
      throw new Error("Failed to create order on the server");
    }
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
}

// Function to handle form submission (when user clicks the checkout button)
async function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  // Get personal info entered by the user
  const personalInfo = {
    firstName: document.getElementById("id_first_name").value,
    lastName: document.getElementById("id_last_name").value,
    email: document.getElementById("id_email").value,
    phoneNumber: document.getElementById("id_phone_number").value,
    address: document.getElementById("id_address").value,
    country: document.getElementById("id_country").value,
    city: document.getElementById("id_city").value,
    zip: document.getElementById("id_zip").value,
  };

  // Get items selected by the user
  const itemsTable = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
  const items = [];

  for (let i = 0; i < itemsTable.rows.length; i++) {
    const selectElement = itemsTable.rows[i].cells[0].querySelector("select");

    if (selectElement) {
      const quantityElement = itemsTable.rows[i].cells[1].querySelector("input");

      if (quantityElement) {
        const productId = selectElement.value;
        const quantity = quantityElement.value;
        const selectedProduct = productsData.find(product => product.id === parseInt(productId));

        if (selectedProduct) {
          const total_price_item = selectedProduct.price * quantity;
          const item = {
            productId,
            quantity,
            total_price_item,
          };
          items.push(item);
        }
      }
    }
  }

  // Create the order object
  const order = {
    personalInfo,
    items,
  };

  try {
    const order_id = await sendOrderToServer(order);

    // Log order_id to the console (order_id received from the server)
    console.log("Order ID:", order_id);

    // Redirect to the success page with the order_id
    window.location.href = `ordersuccess.html?order_id=${order_id}`;
  } catch (error) {
    // Handle error, for example, by displaying an error message to the user
    console.error("Failed to send order:", error);
  }
}

// Add an event listener for form submission
orderForm.addEventListener("submit", handleSubmit);