const product = require('../model/products')

// Fungsi untuk mengambil semua produk
function getAllProducts(req, res) {
    product.findAll()
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Data fetched successfully!",
            productsData: data,
        });
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: "Unsuccessful",
            error: err,
        });
    });
}

module.exports = {
    getAllProducts,
}