export const serializeJson = data => {
  let serialized = {}
  for (let item in data) {
    if (data[item] === null || data[item] === undefined) {
      serialized = { ...serialized, [item]: '' }
    } else {
      serialized = { ...serialized, [item]: data[item] }
    }
  }
  return serialized;
}

export const serializeArray = data => {
  return data.map(obj => {
    let serialized = {}
    for (let item in obj) {
      if (obj[item] === null || obj[item] === undefined) {
        serialized = { ...serialized, [item]: '' }
      } else {
        serialized = { ...serialized, [item]: obj[item] }
      }
    }
    return serialized;
  })
}