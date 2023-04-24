const fields = ['positiveAttitude', 'productivity', 'autonomy', 'communication',  'teamwork',  'selfImprovement',  'openMindedness',  'curiosity',  'cleanCode',  'efficientCode',  'reliableCode',  'javascript',  'backEnd',  'database',  'frontEnd'];

function validateMarks (marks, reportType) {
  if (typeof marks !== 'object') return false;
  const fieldsToCheck = reportType === 'mid-junior' ? fields.slice(0, 12) : [...fields];
  const marksFields = Object.keys(marks);
  if (marksFields.length !== fieldsToCheck.length) return false;

  return fieldsToCheck.reduce((flag, field) => {
    if (!marksFields.includes(field)) return false;
    return flag;
  }, true);
}

module.exports = { validateMarks };