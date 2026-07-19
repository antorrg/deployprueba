import { promptInput, promptConfirm, promptList, promptCheckbox } from './cliNative.js'
// 🔽 Devolvemos un Schema parcial (ej: { campo: { type: "string" } })
export default async function promptForField (context) {
  const field = {}
  const fieldPrompt = context ? `Field name (for ${context}):` : 'Field name:'
  const name = await promptInput(fieldPrompt)
  const kind = await promptList(`Select type of field "${name}":`, [
    'string', 'int', 'float', 'boolean', 'object', 'array'
  ])
  if (['string', 'int', 'float', 'boolean'].includes(kind)) {
    const fieldConfig = { type: kind }
    const hasDefault = await promptConfirm('Do you want to set a default value?', { default: false })
    if (hasDefault) {
      const defaultValue = await promptInput('Enter default value:', {
        validate: (input) => input.length > 0 || 'Value is required'
      })
      fieldConfig.default =
                kind === 'int'
                  ? parseInt(defaultValue)
                  : kind === 'float'
                    ? parseFloat(defaultValue)
                    : kind === 'boolean'
                      ? defaultValue === 'true'
                      : defaultValue
    }
    if (kind === 'string') {
      const sanitizers = await promptCheckbox('Select sanitizers to apply:', [
        { name: 'trim', value: 'trim' },
        { name: 'escape', value: 'escape' },
        { name: 'toLowerCase', value: 'lowercase' },
        { name: 'toUpperCase', value: 'uppercase' }
      ])
      if (sanitizers.length > 0) {
        fieldConfig.sanitize = {}
        for (const s of sanitizers) {
          fieldConfig.sanitize[s] = true
        }
      }
    }
    field[name] = fieldConfig
    return field
  }
  if (kind === 'object') {
    const subfields = {}
    let addMore = true
    while (addMore) {
      const child = await promptForField(`object "${name}"`)
      Object.assign(subfields, child)
      addMore = await promptConfirm('Add another field to the object?', { default: true })
    }
    field[name] = subfields
    return field
  }
  if (kind === 'array') {
    const itemType = await promptList('Select type for array items:', [
      'string', 'int', 'float', 'boolean', 'object'
    ])
    if (itemType === 'object') {
      const subfields = {}
      let addMore = true
      while (addMore) {
        const child = await promptForField(`items of array "${name}"`)
        Object.assign(subfields, child)
        addMore = await promptConfirm('Add another field in the array?', { default: true })
      }
      field[name] = [subfields]
    } else {
      const itemSchema = { type: itemType }
      if (itemType === 'string') {
        const sanitizers = await promptCheckbox('Select sanitizers for array items:', [
          { name: 'trim', value: 'trim' },
          { name: 'escape', value: 'escape' },
          { name: 'toLowerCase', value: 'lowercase' },
          { name: 'toUpperCase', value: 'uppercase' }
        ])
        if (sanitizers.length > 0) {
          itemSchema.sanitize = {}
          for (const s of sanitizers) {
            itemSchema.sanitize[s] = true
          }
        }
      }
      field[name] = [itemSchema]
    }
    return field
  }
  throw new Error(`Unknown type: ${kind}`)
}
