const orders = require('../model/orders')
const orderItem = require('../model/orderItem')

async function createOrder(req, res, next) {
  try {
    const orderData = {
      first_name: req.body.personalInfo.firstName,
      last_name: req.body.personalInfo.lastName,
      email: req.body.personalInfo.email,
      phone_number: req.body.personalInfo.phoneNumber,
      address: req.body.personalInfo.address,
      country: req.body.personalInfo.country,
      city: req.body.personalInfo.city,
      zipcode: req.body.personalInfo.zip,
    };

    // Create the order and wait for the result
    const createdOrder = await orders.create(orderData);

    // Call the createOrderItem function to create order items
    await createOrderItem(req.body.items, createdOrder);

    // Include the order_id in the response
    res.json({ order_id: createdOrder.Order_id }); // Assuming the order_id is available on the createdOrder object

  } catch (error) {
    // Handle any errors here
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
  
async function createOrderItem(orderItems, createdOrder) {
  const promises = [];
  
  for (const element of orderItems) {
    const orderItemData = {
      product_id: element.productId,
      quantity: element.quantity,
      total_price_item: element.total_price_item,
      order_id: createdOrder.Order_id, // Assuming "id" is the primary key of the order
    };
  
    // Push the promise into the array
    promises.push(orderItem.create(orderItemData));
  }
  
  // Use Promise.all to execute all the promises concurrently
  await Promise.all(promises);
}

module.exports = {
    createOrder
}