import ItemMapper from './../mappers/item-mapper';

class Item {
  /**
   * Creates new Item instance and assigns data.
   * If content is empty, but id exists, tries to find saved item
   * @param {int|null} id of item
   * @param {Object} data with all filled fields
   */
  constructor(id, data) {
    this.id = id;
    this.content = data.content;
    this.checked = data.checked;

    if (this.id !== null && !this.content) {
      this.find(id);
    }
  }

  /**
   * Tries to find already saved Item
   * @param {int} id of Item to find
   * @return {boolean} true if Item was found, false otherwise
   */
  find(id) {
    let item = ItemMapper.getById(id);
    if (!item) {
      return false;
    }

    this.id = id;
    this.content = item.content;
    this.checked = item.checked;
    return true;
  }

  /**
   * Saves Item
   */
  save() {
    this.id = ItemMapper.save(this);
  }
}

export default Item;
