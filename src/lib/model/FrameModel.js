import mongoose from "mongoose";

// Helper function to generate a random #XXX code
function generateFCode() {
  const num = Math.floor(100 + Math.random() * 900); // random 3-digit number
  return `#${num}`;
}

const FrameModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  fCode: { type: String, unique: true, default: generateFCode }, // <-- new field

  category: { type: String },
  brand: { type: String },
  description: { type: String },

  sizes: [{ type: String }],
  displayTypes: [{ type: String }],
  matTypes: [{ type: String }],

  images: [{ type: String }], 

  pricing: {
    currentPrice: { type: Number, default: null },
    discountPrice: { type: Number, default: null }
  },

  specifications: { type: Object, default: {} },

  availability: {
    inStock: { type: Boolean, default: true },
    customizable: { type: Boolean, default: true }
  },

  metadata: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
});

// Update metadata.updatedAt and ensure fCode is unique
FrameModelSchema.pre("save", async function() {
  this.metadata.updatedAt = Date.now();

  // Generate new fCode if not provided
  if (!this.fCode) {
    let code;
    let exists = true;

    // Keep generating until we find a unique one
    while (exists) {
      code = generateFCode();
      exists = await mongoose.models.FrameModel.findOne({ fCode: code });
    }

    this.fCode = code;
  }
});

const FrameModel = mongoose.models.FrameModel || mongoose.model("FrameModel", FrameModelSchema);

export default FrameModel;
