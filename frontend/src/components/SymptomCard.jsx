import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
function SymptomCard({symptom, onDelete, onEdit}) {
  return (
    <div className="w-full mb-5 p-6 bg-green-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{new Date(symptom?.date).toLocaleString("en-CA")}</h5>
    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Symptoms: {symptom?.symptoms.join(', ')}</h3>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-xl">Severity: {symptom?.severity}</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-xl">{symptom?.description}</p>
    <div className='flex gap-2'>
        <div onClick={() => onEdit(symptom)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit&nbsp; <FaEdit/>
        </div>
        <div onClick={() => onDelete(symptom?._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete&nbsp; <FaTrash/>
        </div>
    </div>
</div>
  )
}

export default SymptomCard