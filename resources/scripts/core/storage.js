const storage = localStorage;

const Storage = {
  /**
   * Finds and returns a single object saved with given id
   * @param {int} id of item to find
   * @return {Object} that was saved with given id
   */
  find(id) {
    return JSON.parse(this.findAll()[id]);
  },

  /**
   * Returns storage object which contains all storage key/value pairs
   * @return {Object} of saved key/value pairs
   */
  findAll() {
    return storage.length ? storage : {};
  },

  /**
   * Saves item into storage at given index or creates new item at the end
   * @param {Object} data to save into storage. Saves as JSON string.
   * @param {int|null} index to use for saving
   * @return {int} saved item index
   */
  save(data, index) {
    if (index === null) {
      index = parseInt(storage.key(storage.length - 1), 10) + 1;
    }
    storage[index] = JSON.stringify(data);
    return index;
  },

  /**
   * Saves array of items into storage
   * @param {Array} data to save
   */
  saveMany(data) {
    if (data.constructor === Array) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.save(data[key], parseInt(key, 10));
        }
      }
    }
  },

  /**
   * Removes storage items by given keys
   * @param {Array} keys to remove from storage
   */
  remove(keys) {
    if (keys.constructor === Array) {
      for (let i = 0; i < keys.length; i++) {
        storage.removeItem(keys[i]);
      }
    }
  },

  /**
   * Completely cleans all localStorage
   */
  drop() {
    storage.clear();
  }
};

export default Storage;
