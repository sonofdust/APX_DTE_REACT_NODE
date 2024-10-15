import PropTypes from 'prop-types';

function RecordItem({ record, onDelete, onEdit }) {
  return (
    <div className="record-item">
      <h3>{record.name}</h3>
      <p>Email: {record.email}</p>
      <p>Phone: {record.phone}</p>
      <button onClick={() => onEdit(record)}>Edit</button>
      <button onClick={() => onDelete(record.id)}>Delete</button>
    </div>
  )
}

RecordItem.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RecordItem
