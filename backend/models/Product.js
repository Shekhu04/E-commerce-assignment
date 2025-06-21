const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // e.g., image filename or URL
    details: { type: String, required: true },
    price: { type: Number, required: true },
    specs: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who added it
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
