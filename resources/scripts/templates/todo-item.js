/**
 * To Do item HTML template
 * @param {Item} item for which to generate html
 * @return {string} generated html
 */
export default function(item) {
  return '<li class="todo__item mdl-list__item" id="item-' + item.id + '">' +
    '<span class="mdl-list__item-primary-content">' +
      '<input type="checkbox" id="' + item.id + '" ' +
        (item.checked ? 'checked' : '') + ' ' +
        'class="todo__checkbox mdl-checkbox__input mdl-list__item-avatar">' +
      '<label class="todo__label mdl-checkbox__label" for="' + item.id + '">' +
        item.content +
      '</label>' +
      '<input type="text" class="todo__input mdl-textfield__input hidden">' +
    '</span>' +
    '<span class="mdl-list__item-secondary-action todo__actions" ' +
           'data-id="' + item.id + '">' +
      '<a class="todo__save mdl-button mdl-button--icon hidden">' +
        '<span class="material-icons">done</span>' +
      '</a>' +
      '<a class="todo__edit mdl-button mdl-button--icon">' +
        '<span class="material-icons">edit</span>' +
      '</a>' +
      '<a class="todo__delete mdl-button mdl-button--icon">' +
        '<span class="material-icons">clear</span>' +
      '</a>' +
    '</span>' +
  '</li>';
}
