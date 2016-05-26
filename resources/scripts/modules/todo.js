import Item from '../models/item';
import ItemMapper from '../mappers/item-mapper';
import todoItemTemplate from '../templates/todo-item';

/**
 * TODO: duplicate entries should not be allowed
 * TODO: about box
 * TODO: create and save item with enter
 */

class ToDo {
  /**
   * Creates To Do module instance and registers its events.
   * @param {Element} element that should be parent of all other To Do elements
   */
  constructor(element) {
    this.element = element;
    this.list = this.element.querySelector('.todo__list');
    this.addButton = this.element.querySelector('.todo__add');

    this.registerEvents();
  }

  /**
   * Registers all this module events
   */
  registerEvents() {
    this.addButton.addEventListener('click', e => {
      let input = e.currentTarget.control;
      this.addItem(input.value);
      input.value = '';
    });

    this.list.addEventListener('click', e => {
      let elem = e.target;
      while (elem) {
        if (elem === e.currentTarget) {
          break;
        }

        if (this.handleListClick(elem)) {
          break;
        }

        elem = elem.parentNode;
      }
    });

    this.list.addEventListener('input', e => {
      console.log(e);
    });
  }

  /**
   * Handles click event on the list
   * @param {Element} elem on which it was clicked
   * @return {boolean} true event was handled, false if no suitable action was found
   */
  handleListClick(elem) {
    if (elem.classList && elem.classList.contains('todo__checkbox')) {
      ToDo.toggleItem(parseInt(elem.id, 10), elem.checked);
    } else {
      let parent = elem.parentNode;
      if (parent.classList && parent.classList.contains('todo__actions')) {
        let id = parseInt(parent.getAttribute('data-id'), 10);
        if (elem.classList.contains('todo__save')) {
          this.saveItem(id);
          return true;
        } else if (elem.classList.contains('todo__edit')) {
          this.editItem(id);
          return true;
        } else if (elem.classList.contains('todo__delete')) {
          this.deleteItem(id);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Gets all items from storage and displays them
   */
  renderItems() {
    let items = ItemMapper.getAll();
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        this.renderItem(items[key]);
      }
    }
  }

  /**
   * Display single Item in the list
   * @param {Item} item to display in dom
   */
  renderItem(item) {
    let container = document.createElement('div');
    container.innerHTML = todoItemTemplate(item);
    this.list.appendChild(container.firstElementChild);
  }

  /**
   * Creates new Item and adds it to dom
   * @param {string} content of new Item
   */
  addItem(content) {
    let item = new Item(null, {
      content: content,
      checked: false
    });
    item.save();
    this.renderItem(item);
  }

  /**
   * Changes Item state by id
   * @param {int} id of item to toggle
   * @param {boolean} checked item status
   */
  static toggleItem(id, checked) {
    let item = ItemMapper.getById(id);
    item.checked = checked;
    item.save();
  }

  /**
   * Saves Item from dom to storage by given id
   * @param {int} id of item to save
   */
  saveItem(id) {
    console.log('save ' + id);

    let itemNode = this.list.querySelector('#item-' + id);
    itemNode.querySelector('.todo__save').classList.toggle('hidden');
    itemNode.querySelector('.todo__edit').classList.toggle('hidden');

    let input = itemNode.querySelector('.todo__input');
    input.classList.toggle('hidden');

    let label = itemNode.querySelector('.todo__label');
    label.innerText = input.value;
    label.classList.remove('hidden');

    let item = ItemMapper.getById(id);
    item.content = input.value;
    item.save();
  }

  /**
   * Start editing Item by its id
   * @param {int} id of item to start editing
   */
  editItem(id) {
    console.log('edit ' + id);
    let item = this.list.querySelector('#item-' + id);
    item.querySelector('.todo__save').classList.toggle('hidden');
    item.querySelector('.todo__edit').classList.toggle('hidden');

    let label = item.querySelector('.todo__label');
    label.classList.add('hidden');

    let input = item.querySelector('.todo__input');
    input.value = label.innerText;
    input.classList.remove('hidden');
  }

  /**
   * Deletes item by given id
   * @param {int} id of item to delete
   */
  deleteItem(id) {
    console.log('delete ' + id);
    ItemMapper.remove(id);
    this.list.removeChild(this.list.querySelector('#item-' + id));
  }
}

export default ToDo;
