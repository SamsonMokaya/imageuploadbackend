const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: { type: String, default: '0' }, // Add fields for form data as needed with default '0'
  email: { type: String, default: '0' },
  phone_number: { type: String, default: '0' },
  alternative_phoneno: { type: String, default: '0' },
  county: { type: String, default: '0' },
  constituency: { type: String, default: '0' },
  educated: { type: String, default: '0' },
  course: { type: String, default: '0' },
  year_of_study: { type: String, default: '0' },
  years_experience: { type: String, default: '0' },
  employment_status: { type: String, default: '0' },
  business_profit: { type: String, default: '0' },
  gender: { type: String, default: '0' },
  model_size: { type: String, default: '0' },
  product: { type: String, default: '0' },
  fabric_no: { type: String, default: '0' },
  about_rivatex: { type: String, default: '0' },
  entry_reason: { type: String, default: '0' },
  prize_question: { type: String, default: '0' },
  images: [String] // Store image file paths
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
