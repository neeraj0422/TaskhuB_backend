const express = require("express");
const router = express.Router();
const YourModel = require("../database/model/YourModel"); // Replace with the path to your model file

// Create a new record
router.post("/records", async (req, res) => {
  try {
    const uniqueEntries = [
      {
        "S_NO": 1,
        "Administration_number": 1013,
        "Company": "SIMU Lifestyle"
      },
      {
        "S_NO": 2,
        "Administration_number": 1020,
        "Company": "Liquidian Holding"
      },
      {
        "S_NO": 3,
        "Administration_number": 1021,
        "Company": "Liquidhedge BV"
      },
      {
        "S_NO": 4,
        "Administration_number": "NIE3431032",
        "Company": "RUJOCAMA Holding B.V."
      },
      {
        "S_NO": 5,
        "Administration_number": "NIE343BV",
        "Company": "Triple A Strategic Consultancy BV 1032"
      },
      {
        "S_NO": 6,
        "Administration_number": "NIE3431034",
        "Company": "Rugile Beauty"
      },
      {
        "S_NO": 7,
        "Administration_number": "NIE3431037",
        "Company": "Shoplace"
      },
      {
        "S_NO": 8,
        "Administration_number": "NIE3431039",
        "Company": "Securair Dienstverlening"
      },
      {
        "S_NO": 9,
        "Administration_number": "NIE3431043",
        "Company": "Reayou (H. Guan)"
      },
      {
        "S_NO": 10,
        "Administration_number": "NIE3431053",
        "Company": "Autostar Nieuwegein"
      },
      {
        "S_NO": 11,
        "Administration_number": "NIE3431065",
        "Company": "G.R.A. Cleaningservice"
      },
      {
        "S_NO": 12,
        "Administration_number": "NIE3431063",
        "Company": "Sri Sai Global Foods B.V. (Amsterdam)"
      },
      {
        "S_NO": 13,
        "Administration_number": "NIE3431067",
        "Company": "Evonsys BV"
      },
      {
        "S_NO": 14,
        "Administration_number": "NIE3431072",
        "Company": "Adeptview"
      },
      {
        "S_NO": 15,
        "Administration_number": "NIE3431073",
        "Company": "Sai Group BV"
      },
      {
        "S_NO": 16,
        "Administration_number": "NIE3431082",
        "Company": "Sai Group of Restaurants B.V. (Nijmegen)"
      },
      {
        "S_NO": 17,
        "Administration_number": "NIE343-1143",
        "Company": "Sai Group Of Tachnology B.V."
      },
      {
        "S_NO": 18,
        "Administration_number": "NIE343-1144",
        "Company": "Sai Group Investments B.V."
      },
      {
        "S_NO": 19,
        "Administration_number": "NIE343-1145",
        "Company": "Sai Ram Utrecht B.V."
      },
      {
        "S_NO": 20,
        "Administration_number": "NIE343-1146",
        "Company": "Sai Ram Amsterdam B.V."
      },
      {
        "S_NO": 21,
        "Administration_number": "NIE3431107",
        "Company": "Sunny Enterprises B.V."
      },
      {
        "S_NO": 22,
        "Administration_number": "NIE3431108",
        "Company": "YAM sales & consultancy"
      },
      {
        "S_NO": 23,
        "Administration_number": "NIE3431113",
        "Company": "DTA Holland"
      },
      {
        "S_NO": 24,
        "Administration_number": "NIE3431115",
        "Company": "Viledo B.V."
      },
      {
        "S_NO": 25,
        "Administration_number": "NIE343114",
        "Company": "Leyman Holding B.V."
      },
      {
        "S_NO": 26,
        "Administration_number": "NIE3431151",
        "Company": "XF Construct"
      },
      {
        "S_NO": 27,
        "Administration_number": "DEN2541009",
        "Company": "De man totaal onderhoud"
      },
      {
        "S_NO": 28,
        "Administration_number": "DEN2541014",
        "Company": "Entrainement Anneke Hendriks"
      },
      {
        "S_NO": 29,
        "Administration_number": "DEN2541028",
        "Company": "M. M. Bouw & Onderhoud"
      },
      {
        "S_NO": 30,
        "Administration_number": "DEN2541047",
        "Company": "Loyaal beveiliging BV"
      },
      {
        "S_NO": 31,
        "Administration_number": "DEN2541048",
        "Company": "Kawah Hoveniersbedrijf B.V."
      },
      {
        "S_NO": 32,
        "Administration_number": "DEN2541056",
        "Company": "Partycatering/onderhoundsbedrif jc"
      },
      {
        "S_NO": 33,
        "Administration_number": "DEN2541057",
        "Company": "BP Bouw & Sloop"
      },
      {
        "S_NO": 34,
        "Administration_number": "DEN2541058",
        "Company": "South American Trading Company"
      },
      {
        "S_NO": 35,
        "Administration_number": "DEN2541063",
        "Company": "Daans Monuglas Specials"
      },
      {
        "S_NO": 36,
        "Administration_number": "DEN2541064",
        "Company": "Madjoe Dienstverlening"
      },
      {
        "S_NO": 37,
        "Administration_number": "DEN2541068",
        "Company": "Invictus Real Estate"
      },
      {
        "S_NO": 38,
        "Administration_number": "DEN2541073",
        "Company": "Westkabel BV"
      },
      {
        "S_NO": 39,
        "Administration_number": "DEN2541074",
        "Company": "Reptra BV"
      },
      {
        "S_NO": 40,
        "Administration_number": NaN,
        "Company": "Reptra"
      },
      {
        "S_NO": 41,
        "Administration_number": "DEN2541081",
        "Company": "Reptra holding B.V"
      },
      {
        "S_NO": 42,
        "Administration_number": "M654JTG122",
        "Company": "J&D Tandarts BV"
      },
      {
        "S_NO": 43,
        "Administration_number": NaN,
        "Company": "J&D Tandarts Holding"
      },
      {
        "S_NO": 44,
        "Administration_number": NaN,
        "Company": "J&D Tandarts Salaris"
      },
      {
        "S_NO": 45,
        "Administration_number": "DEN2541083",
        "Company": "BW Horses & Trade"
      },
      {
        "S_NO": 46,
        "Administration_number": "DEN2541093",
        "Company": "Nowi & Peppa"
      },
      {
        "S_NO": 47,
        "Administration_number": "M645TUW114",
        "Company": "Tupp@work B.V."
      },
      {
        "S_NO": 48,
        "Administration_number": "M645TUW115",
        "Company": "TuppholdingB.V."
      },
      {
        "S_NO": 49,
        "Administration_number": "DEN2541051",
        "Company": "Overblifstichting Broodje Emmaus"
      },
      {
        "S_NO": 50,
        "Administration_number": 1162,
        "Company": "Lavini's E-commerce"
      },
      {
        "S_NO": 51,
        "Administration_number": NaN,
        "Company": "J & G TANDHEELKUNDE B.V."
      },
      {
        "S_NO": 52,
        "Administration_number": "NIE3431062",
        "Company": "Jim Transport en Logistiek"
      },
      {
        "S_NO": 53,
        "Administration_number": "NIE341174",
        "Company": "JPT Car Tuning"
      },
      {
        "S_NO": 54,
        "Administration_number": "DEN2541077",
        "Company": "M.Florencia onderhoud & Klusbedrijf"
      },
      {
        "S_NO": 55,
        "Administration_number": "NIE3441213",
        "Company": "YXR (DHR. PAN)"
      },
      {
        "S_NO": 56,
        "Administration_number": "NIE3431158",
        "Company": "Enmed BV"
      },
      {
        "S_NO": 57,
        "Administration_number": "NIE3431159",
        "Company": "Enmed Global BV"
      },
      {
        "S_NO": 58,
        "Administration_number": "NIE3431176",
        "Company": "DUTCH PRODUCT PARTNER BV"
      },
      {
        "S_NO": 59,
        "Administration_number": "NIE3431177",
        "Company": "STARTUP SIMON (SIMON WOUDENBERG)"
      },
      {
        "S_NO": 60,
        "Administration_number": "DEN2541084",
        "Company": "OKTANA BV"
      }
    ]

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
    }));

    for (const rec of finalRecords) {
      const record = new YourModel(req.body);
      const savedRecord = await record.save();
    }

    res.status(201).json(savedRecord);
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
      createdAt: {
        $gte: new Date(yearInt, monthInt - 1, 1), // Month is 0-indexed
        $lt: new Date(yearInt, monthInt, 1),
      },
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