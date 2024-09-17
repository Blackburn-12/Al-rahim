import mongoose from 'mongoose';

const sequenceNumberSchema = new mongoose.Schema({
  sequenceValue: {
    type: Number,
    default: 0
  }
});

const SequenceNumber = mongoose.model('SequenceNumber', sequenceNumberSchema);
export default SequenceNumber;
