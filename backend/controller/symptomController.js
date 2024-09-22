const Symptom = require("../models/Symptom");

exports.addSymptom = async (req, res) => {
  const { date, symptoms, severity, description } = req.body;
  try {
    const newSymptom = new Symptom({
      user: req.user,
      date,
      symptoms,
      severity,
      description,
    });
    await newSymptom.save();
    res.status(201).json(newSymptom);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

exports.getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve symptoms", err });
  }
};

exports.getSymptomsByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const symptoms = await Symptom.find({
      user: req.user,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.status(200).json(symptoms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve symptoms by date", error });
  }
};

exports.getSymptomsByWeek = async (req, res) => {
  const { week } = req.params;
  try {
    const startOfWeek = new Date(week);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const symptoms = await Symptom.find({
      user: req.user,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    });

    res.status(200).json(symptoms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve symptoms by week", error });
  }
};

exports.updateSymptom = async (req, res) => {
  const { symptoms, severity, description } = req.body;

  try {
    const symptom = await Symptom.findById(req.params.id);

    if (!symptom) {
      return res.status(404).json({ message: "Symptom entry not found" });
    }

    symptom.symptoms = symptoms || symptom.symptoms;
    symptom.severity = severity || symptom.severity;
    symptom.description = description || symptom.description;

    await symptom.save();
    res.status(200).json(symptom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update symptom entry " });
  }
};

exports.deleteSymptom = async (req, res) => {
  try {
    const symptom =await Symptom.findOneAndDelete( {_id: req.params.id})

    if (!symptom) {
      return res.status(404).json({ message: "Symptom entry not found" });
    }

    res.status(200).json({ message: "Symptom entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete symptom entry", error });
  }
};
