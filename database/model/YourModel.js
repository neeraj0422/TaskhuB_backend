const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema({
  S_NO: { type: Number, required: true },
  Administration_number: { type: String, required: true },
  Company: { type: String, required: true },
  Basecone: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  Bank: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  SalaryEntry: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  Payslips: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  Dividend: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  Corporatetax: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  Vat: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  AnnualTax: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  CashFlowStatement: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  ProfitLoss: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
  TrialBalance: {
    type: String,
    enum: ["inprogress", "pending", "completed"],
    required: false,
  },
});

// Create a model
const YourModel = mongoose.model("YourModel", schema);

// Export the model for use in your application
module.exports = YourModel;
