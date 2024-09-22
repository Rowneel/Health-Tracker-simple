import { React, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function SymptomPage() {
  const { token } = useAuth();
  let defaultDate = new Date();
  defaultDate.getDate().toLocaleString;
  const [formData, setFormData] = useState({
    date: defaultDate,
    symptoms: [],
    severity: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const options = [
    "headache",
    "nausea",
    "sensitivity to light",
    "vomiting",
    "jaw pain",
    "ear pain",
    "facial pain",
    "fever",
    "stiff neck",
    "confusion",
    "seizures",
    "aura",
    "light sensitivity",
    "severe headache",
    "vision changes",
    "chills",
    "sweating",
    "fatigue",
    "muscle pain",
    "vision problems",
    "hormonal changes",
    "cough",
    "loss of taste or smell",
    "difficulty breathing",
    "muscle aches",
    "sore throat",
    "swollen lymph nodes",
    "nasal congestion",
    "diarrhea",
    "stomach cramps",
    "nervousness",
    "racing heart",
    "trembling",
    "loss of interest",
    "changes in appetite",
    "sleep disturbances",
    "sneezing",
    "itchy eyes",
    "rashes",
    "hives",
  ];

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    if (
      selectedValue &&
      options.includes(selectedValue) &&
      !formData.symptoms.includes(selectedValue)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        symptoms: [...prevData.symptoms, selectedValue],
      }));
      setInputValue("");
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !formData.symptoms.includes(trimmedValue)) {
        setFormData((prevData) => ({
          ...prevData,
          symptoms: [...prevData.symptoms, trimmedValue],
        }));
        setInputValue("");
      }
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      symptoms: prevData.symptoms.filter(
        (symptom) => symptom !== symptomToRemove
      ),
    }));
  };

  const handleSymptomChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "date" ? new Date(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/symptom",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({
        date: defaultDate,
        symptoms: [],
        severity: "",
        description: "",
      });
      setInputValue("");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Track Your Symptoms
      </h1>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="date"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={formData?.date.toLocaleDateString("en-CA")}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="date"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Date
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group flex flex-wrap">
        {formData?.symptoms.map((symptomp, index) => (
          <div
            key={index}
            className="flex bg-green-400 rounded-lg mr-1 mb-1 mt-2 text-white p-1 items-center"
          >
            {symptomp}
            <button
              onClick={() => removeSymptom(symptomp)}
              className="ml-1 border-none"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          name="symptoms"
          onChange={handleSymptomChange}
          onSelect={handleSelect}
          onKeyDown={handleKeydown}
          placeholder=""
          list="ids"
          className="flex flex-1 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          // style={{ border: "none", outline: "none", flex: 1 }}
        />
        <datalist id="ids">
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
        <label
          htmlFor="symptoms"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Symptoms
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="severity"
          min={1}
          max={10}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData?.severity}
          required
        />
        <label
          htmlFor="severity"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Severity
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <textarea
          onChange={handleChange}
          name="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description"
          value={formData?.description}
        ></textarea>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default SymptomPage;
