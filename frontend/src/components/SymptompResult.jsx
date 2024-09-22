import React from "react";

const conditionMapping = {
  "Headache Disorders": [
    "headache",
    "nausea",
    "sensitivity to light",
    "vomiting",
  ],
  "TM Joint Syndrome": ["jaw pain", "headache", "ear pain", "facial pain"],
  "Bacterial Meningitis": [
    "fever",
    "stiff neck",
    "headache",
    "nausea",
    "confusion",
  ],
  Migraine: ["headache", "nausea", "vomiting", "aura", "light sensitivity"],
  "Viral Meningoencephalitis": ["fever", "headache", "confusion", "seizures"],
  "Herpes Simplex Encephalitis": ["fever", "headache", "confusion", "seizures"],
  "Intracranial Hemorrhage": [
    "severe headache",
    "nausea",
    "confusion",
    "vision changes",
  ],
  Malaria: ["fever", "chills", "headache", "sweating", "fatigue"],
  "Brain Neoplasms": [
    "headache",
    "seizures",
    "confusion",
    "vision problems",
    "nausea",
  ],
  Chikungunya: ["fever", "joint pain", "headache", "muscle pain"],
  "Pituitary Neoplasms": [
    "headache",
    "vision problems",
    "fatigue",
    "hormonal changes",
  ],
  "COVID-19": [
    "fever",
    "cough",
    "fatigue",
    "loss of taste or smell",
    "difficulty breathing",
  ],
  "Flu (Influenza)": ["fever", "cough", "muscle aches", "fatigue", "headache"],
  "Strep Throat": ["sore throat", "fever", "headache", "swollen lymph nodes"],
  Sinusitis: ["facial pain", "nasal congestion", "headache", "fever"],
  Gastroenteritis: ["nausea", "vomiting", "diarrhea", "stomach cramps"],
  "Anxiety Disorders": [
    "nervousness",
    "sweating",
    "racing heart",
    "fatigue",
    "trembling",
  ],
  Depression: [
    "fatigue",
    "loss of interest",
    "changes in appetite",
    "sleep disturbances",
  ],
  "Allergic Reactions": [
    "sneezing",
    "itchy eyes",
    "rashes",
    "hives",
    "difficulty breathing",
  ],
  Pneumonia: [
    "cough",
    "fever",
    "difficulty breathing",
    "chest pain",
    "fatigue",
  ],
  Diabetes: [
    "increased thirst",
    "frequent urination",
    "fatigue",
    "blurred vision",
  ],
  Hypertension: ["headache", "dizziness", "nosebleeds", "shortness of breath"],
};

function SymptomResult({ symptoms, threshold = 2 }) {
  if (symptoms.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md w-1/2">
        <p className="text-3xl">No symptoms reported for this week.</p>
        <div className="bg-gray-100 p-6 rounded-lg mt-2">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Consult a Professional if any severity is high and unbearable.
          </h2>
          <p className="text-gray-700">
            <strong className="font-bold">Disclaimer:</strong> The conditions
            listed are based on your reported symptoms and may not be accurate.
            Always consult a healthcare professional for a proper diagnosis and
            treatment.
          </p>
        </div>
      </div>
    );
  }

  const symptomList = new Set(
    symptoms.flatMap((symptom) => symptom.symptoms.map((s) => s.toLowerCase()))
  );

  const likelyConditions = Object.keys(conditionMapping).filter((condition) => {
    const matchingSymptoms = conditionMapping[condition].filter(
      (conditionSymptom) => symptomList.has(conditionSymptom)
    );
    return matchingSymptoms.length >= threshold;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full md:w-1/2 dark:bg-gray-800 ">
      {symptoms.length === 0 ? (
        <>
          <p className="text-3xl dark:text-white">No symptoms reported for this week.</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Potential Conditions
          </h2>
          {likelyConditions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2 columns-2 gap-4 ">
            {likelyConditions.map((condition) => (
              <li key={condition} className="text-gray-700 dark:text-white">
                {condition}
              </li>
            ))}
          </ul>
          ) : (
            <p className="text-gray-500">
              No likely conditions found based on the entered symptoms.
            </p>
          )}
        </>
      )}
      <div className="bg-gray-100 p-6 rounded-lg mt-2">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Consult a Professional if any severity is high and unbearable.
        </h2>
        <p className="text-gray-700">
          <strong className="font-bold">Disclaimer:</strong> The conditions
          listed are based on your reported symptoms and may not be accurate.
          Always consult a healthcare professional for a proper diagnosis and
          treatment.
        </p>
      </div>
    </div>
  );
}

export default SymptomResult;
