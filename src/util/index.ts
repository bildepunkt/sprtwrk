/**
 * @method xhrGet
 * @param {string} path
 * @param {Function} callback
 */
export function xhrGet (path: string, callback: Function): void {
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', path, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      callback(JSON.parse(xhr.responseText));
    } else {
      // TODO handle status
    }
  };
  xhr.onerror = () => {
    // TODO handle error
  };
  xhr.send();
}

/**
 * @method getObjectCount
 * @param {object} obj
 * @returns {number}
 */
export function getObjectCount (obj): number {
  let count = 0;

  for (let key in obj) {
    count++;
  }

  return count;
}
