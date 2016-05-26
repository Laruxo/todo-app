import Item from './../models/item';
import Storage from './../core/storage';

export default {
  /**
   * Finds and returns Item entity from storage.
   * @param {int} id of item to find
   * @return {Item|null} found Item entity or null if not found
   */
  getById(id) {
    let data = Storage.find(id);
    if (data) {
      return new Item(id, data);
    }

    return null;
  },

  /**
   * Finds and returns array of Item entities from storage.
   * @return {Array} of Item entities
   */
  getAll() {
    let items = [];
    let data = Storage.findAll();

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let item = new Item(parseInt(key, 10), data[key]);
        items.push(item);
      }
    }

    return items;
  },

  /**
   * Saves given item in storage
   * @param {Item} item to save in storage
   * @return {int|boolean} saved item id or false if it fails to save
   */
  save(item) {
    return Storage.save({
      content: item.content,
      checked: item.checked
    }, item.id);
  },

  /**
   * Removes item from storage by given id
   * @param {int} id of item to delete from storage
   */
  remove(id) {
    Storage.remove([id]);
  }
};
