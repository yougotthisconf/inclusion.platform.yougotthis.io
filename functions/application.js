const { AIRTABLE_KEY, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env
const Airtable = require('airtable-plus');

const airtable = new Airtable({
    baseID: AIRTABLE_BASE,
    apiKey: AIRTABLE_KEY,
    tableName: AIRTABLE_TABLE
})

exports.handler = async event => {
  try {
    const { fields: application } = await airtable.find(event.queryStringParameters.id)
    const accepted = Boolean(application.Status && application.Status == 'Accepted')

    return res({ accepted })
  } catch (error) {
    return res({ error }, 500)
  }
}

function res(o, statusCode = 200) {
  return { statusCode, body: JSON.stringify(o) }
}
