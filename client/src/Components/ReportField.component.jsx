import React from 'react'

function ReportFieldComponent({ fieldName, report, update, setFormMarks }) {

  function handleMarkChange(e) {
    const { name, value } = e.target;
    setFormMarks(prevState => ({ ...prevState, [name]: value }));
  }

  function getCamelCaseFieldName() {
    const arr = fieldName.split(' ').join('').split('-').map((word, index) => {
      if (index === 0) return word[0].toLowerCase() + word.slice(1);
      else return word[0].toUpperCase() + word.slice(1);
    });

    return arr.join('');
  }

  return (
    <tr className='h-12 overflow-y-hidden'>
      <td>{fieldName}</td>
      {update ?
        <td>
          <input type="number" name={getCamelCaseFieldName()} min={0} max={10} placeholder="Mark" required onChange={handleMarkChange} defaultValue={report && report.marks ? report.marks.positiveAttitude : 0} className="input input-bordered input-sm w-full max-w-xs" />
        </td>
        :
        <td className='h-10'>{(report && report.marks) ? report.marks[getCamelCaseFieldName()] : '-'}</td>}
    </tr>
  )
}

export default ReportFieldComponent