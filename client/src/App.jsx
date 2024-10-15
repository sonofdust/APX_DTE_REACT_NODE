import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import RecordForm from './components/RecordForm'
import RecordList from './components/RecordList'

function App() {
  const [records, setRecords] = useState([])
  const [editingRecord, setEditingRecord] = useState(null)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5173/api/records');
      console.log("MY RESPONSE", response.data);
      //setRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  const addRecord = async (record) => {
    try {
      console.log("RECORD", record)
      const response = await axios.post('http://localhost:5173/api/records', record);
      setRecords([...records, response.data]);
    } catch (error) {
      console.error('Error adding record:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  const updateRecord = async (updatedRecord) => {
    console.log("UPDATED RECORD", updatedRecord)
    try {
      const response = await axios.put(`http://localhost:5173/api/records/${updatedRecord.id}`, updatedRecord);
      setRecords(records.map(record =>
        record.id === response.data.id ? response.data : record
      ));
      setEditingRecord(null);
    } catch (error) {
      console.error('Error updating record:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5173/api/records/${id}`);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  const editRecord = (record) => {
    setEditingRecord(record)
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <RecordForm
        addRecord={addRecord}
        updateRecord={updateRecord}
        editingRecord={editingRecord}
      />
      <RecordList
        records={records}
        onDelete={deleteRecord}
        onEdit={editRecord}
      />
    </div>
  )
}

export default App
