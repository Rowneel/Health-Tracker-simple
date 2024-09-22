import { React, useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import SymptomCard from "../components/SymptomCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EditSymptomForm from "../components/EditSymptomForm";
import SymptompResult from "../components/SymptompResult";

function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { token } = useAuth();

  const getStartAndEndOfWeek = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Start on Monday 
    startOfWeek.setDate(diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  };
  const { startOfWeek } = getStartAndEndOfWeek(selectedDate);
  const startDate = startOfWeek.toISOString().split("T")[0];

  const fetchSymptomsByWeek = async (weekStartDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/symptom/week/${weekStartDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSymptoms(response.data);
    } catch (error) {
      console.error("Error fetching symptoms for the week:", error);
    }
  };

  useEffect(() => {
    const { startOfWeek } = getStartAndEndOfWeek(selectedDate);
    fetchSymptomsByWeek(startOfWeek.toISOString().split("T")[0]);
  }, [token]);

  const handleEdit = (symptom) => {
    setCurrentSymptom(symptom);
    setIsEditing(true); // Show the form
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentSymptom(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/symptom/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSymptoms(symptoms.filter((symptom) => symptom._id !== id));
    } catch (err) {
      console.error("Error deleting Symptom", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const { startOfWeek } = getStartAndEndOfWeek(date);
    fetchSymptomsByWeek(startOfWeek.toISOString().split("T")[0]);
  };

  return (
    <div>
      <div className="flex flex-col items-center  mb-10 gap-4 md:justify-around md:flex-row min-h-96">
        <Calendar value={selectedDate} onClickDay={handleDateChange} />
        <SymptompResult symptoms = {symptoms}/>
      </div>
      {isEditing && currentSymptom && (
        <EditSymptomForm
          currentSymptom={currentSymptom}
          onCancel={handleCancel}
          setCurrentSymptom={setCurrentSymptom}
          fetchSymptomsByWeek={fetchSymptomsByWeek}
          startDate={startDate}
        />
      )}
      {symptoms.map((symptom) => (
        <SymptomCard
          key={symptom._id}
          symptom={symptom}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default ReportPage;
