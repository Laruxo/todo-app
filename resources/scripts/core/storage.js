const storageId = 'todo-app';
const storage = localStorage;

const Storage = {
  /**
   * Validates given data object
   * @param {Object} data to validate
   * @return {boolean} true if data does not exist in storage, false otherwise
   */
  validate(data) {
    let json = JSON.stringify(data);

    let all = this.findAll();
    for (let key in all) {
      if (all.hasOwnProperty(key)) {
        if (JSON.stringify(all[key]) === json) {
          return false;
        }
      }
    }
    return true;
  },

  /**
   * Finds and returns a single object saved with given id
   * @param {int} id of item to find
   * @return {Object} that was saved with given id
   */
  find(id) {
    return this.findAll()[id];
  },

  /**
   * Returns object which was saved in our storage
   * @return {Object} that was saved in our storage
   */
  findAll() {
    return storage[storageId] ? JSON.parse(storage[storageId]) : {};
  },

  /**
   * Updates item into storage at given index or creates new item at the end
   * @param {Object} data to save into storage. Saves as JSON string.
   * @param {int|null} index to use for saving
   * @return {int|boolean} saved item index or false on failure
   */
  save(data, index) {
    if (index === null && !this.validate(data)) {
      return false;
    }

    let items = this.findAll();
    if (index === null) {
      let keys = Object.keys(items);
      if (keys.length) {
        index = parseInt(keys[keys.length - 1], 10) + 1;
      } else {
        index = 0;
      }
    }
    items[index] = data;
    storage[storageId] = JSON.stringify(items);

    return index;
  },

  /**
   * Removes storage items by given keys
   * @param {Array} keys to remove from storage
   */
  remove(keys) {
    if (keys.constructor === Array) {
      let items = this.findAll();

      for (let i = 0; i < keys.length; i++) {
        delete items[keys[i]];
      }

      storage[storageId] = JSON.stringify(items);
    }
  },

  /**
   * Completely cleans all localStorage
   */
  drop() {
    storage[storageId] = '{}';
  }
};

export default Storage;
