const express = require("express");
const router = express.Router();
const YourModel = require("../database/model/YourModel"); // Replace with the path to your model file

// Create a new record
router.post("/records", async (req, res) => {
  try {
    const uniqueEntries = req.body.list;
    const Month = req.body.month;
    const Year = req.body.year;

    const defaultFields = {
      Basecone: "pending",
      Bank: "pending",
      SalaryEntry: "pending",
      Payslips: "pending",
      Dividend: "pending",
      Corporatetax: "pending",
      Vat: "pending",
      AnnualTax: "pending",
      CashFlowStatement: "pending",
      ProfitLoss: "pending",
      TrialBalance: "pending",
    };

    const finalRecords = uniqueEntries.map((entry) => ({
      ...entry,
      ...defaultFields,
      Month,
      Year
    }));

    for (const rec of finalRecords) {
      const record = new YourModel(rec);
      const savedRecord = await record.save();
    }

    res.status(201).json({ status: "record created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/records", async (req, res) => {
  try {
    const { year, month } = req.query;
    const yearInt = parseInt(year);
    const monthInt = parseInt(month);

    const records = await YourModel.find({
      Month: monthInt,
      Year: yearInt
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single record by ID
router.get("/records/:id", async (req, res) => {
  try {
    const record = await YourModel.findById(req.params.id);
    if (record === null) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a record by ID
router.put("/records/:id", async (req, res) => {
  try {
    const updatedRecord = await YourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedRecord === null) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a record by ID
router.delete("/records/:id", async (req, res) => {
  try {
    const deletedRecord = await YourModel.findByIdAndRemove(req.params.id);
    if (deletedRecord === null) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(deletedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// app.listen(port, () => {
//     console.log(Server is running on port ${port});
//   });
