import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const urlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
    trim: true
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,

  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
  
});


// Method to increment clicks
urlSchema.methods.incrementClicks = function() {
  this.clicks += 1;
  return this.save();
};

const shortUrl = mongoose.model('shortUrl', urlSchema);

export default shortUrl;