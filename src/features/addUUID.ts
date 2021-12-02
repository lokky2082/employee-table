export default function addUUID ():{uuid: string, getUuid: any} {
  const getUuid = ():string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  const uuid = getUuid()
  return {
    uuid,
    getUuid
  }
}
