import RecordItem from './RecordItem'
import PropTypes from 'prop-types'

function RecordList({ records, onDelete, onEdit }) {
  return (
    <div className="record-list">
      {records.map(record => (
        <RecordItem 
          key={record.id} 
          record={record} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  )
}

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RecordList
