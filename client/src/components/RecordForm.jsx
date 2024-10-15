import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function RecordForm({ addRecord, updateRecord, editingRecord }) {
  const [record, setRecord] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    if (editingRecord) {
      setRecord(editingRecord)
    } else {
      setRecord({ name: '', email: '', phone: '' })
    }
  }, [editingRecord])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingRecord) {
      updateRecord(record)
    } else {
      addRecord(record)
    }
    setRecord({ name: '', email: '', phone: '' })
  }

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={record.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={record.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={record.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">{editingRecord ? 'Update' : 'Add'} Record</button>
    </form>
  )
}

RecordForm.propTypes = {
  addRecord: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  editingRecord: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  })
}

export default RecordForm
