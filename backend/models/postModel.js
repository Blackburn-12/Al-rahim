import mongoose from 'mongoose';
import SequenceNumber from './sequenceNumber.js';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  capaNumber: {
    type: Number,
    unique: true
  },
  eventSelection: {
    rootCause: { type: String, required: true },
    causeCategory: { type: String, required: true }
  },
  productDetails: {
    customer: { type: String, required: true },
    brand: { type: String, required: true },
    productType: { type: String, required: true },
    towelType: { type: String, required: true },
    article: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    design: { type: String, required: true },
    productId: { type: String, required: true },
    sos: { type: String, required: true },
    customerPO: { type: String, required: true }
  },
  problemDiscussion: {
    dateOccurred: { type: Date, required: true },
    problemStatement: { type: String, required: true },
    containmentAction: { type: String, required: true },
    memberRCA: [{ type: String, required: true }]
  },
  rcaFor6Ms: {
    method: [{ type: String, required: true }],
    material: [{ type: String, required: true }],
    machine: [{ type: String, required: true }],
    manpower: [{ type: String, required: true }],
    measurement: [{ type: String, required: true }],
    milieu: [{ type: String, required: true }]
  },
  correctiveAction: {
    detection: { type: String },
    occurrence: { type: String },
    dateOccurred: { type: Date }
  },
  preventiveAction: {
    detection: { type: String },
    occurrence: { type: String },
    dateOccurred: { type: Date }
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

postSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const sequence = await SequenceNumber.findOneAndUpdate(
      {},
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    console.log('Generated CAPA Number:', sequence.sequenceValue);
    this.capaNumber = sequence.sequenceValue;
    next();
  } catch (err) {
    console.error('Error generating CAPA Number:', err.message);
    next(err);
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
