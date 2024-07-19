export function formatDateToMMDDYYYY(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

export function getUpdatedReqBody(originalObject){
    const filteredObject = Object.entries(originalObject)
    .filter(([key, value]) => value !== '')
    .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
    }, {});
    return filteredObject
}