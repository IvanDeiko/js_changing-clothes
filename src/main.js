'use script'


const SELECT_CLOTHER = 'select_clother';
const EDIT_CLOTHER_VALUE = 'edit_clother_value';
const CHANGE_EDIT_MODE = 'change_edit_mode';
const DELETE_CLOTHER = 'delete_clother';

function deleleItemAction(index) {
  return {
    type: DELETE_CLOTHER,
    index
  }
}

function selectClotherAction(index) {
  return {
    type: SELECT_CLOTHER,
    index
  };
};

function editClotherAction(value) {
  return {
    type: EDIT_CLOTHER_VALUE,
    value
  };
};

function changeEditModeAction() {
  return {
    type: CHANGE_EDIT_MODE
  }
}

const initialState = {
  clothers: [
    {
      name: 'Apron',
      edit: false
    },
    {
      name: 'Belt',
      edit: false
    },
    {
      name: 'Dress',
      edit: false
    },
    {
      name: 'Earrings',
      edit: false
    },
    {
      name: 'Fur coat',
      edit: false
    },
    {
      name: 'Gloves',
      edit: false
    },
    {
      name: 'Gloves',
      edit: false
    },
  ],
  indexClother: null,
};

function getNextState(state = initialState, action) {
  switch(action.type) {
    case SELECT_CLOTHER: 
      return {
        ...state,
        indexClother: action.index
      }
    case CHANGE_EDIT_MODE:
      return {
        ...state,
        clothers: state.clothers.map((item, index) => {
          if (index === state.indexClother) {
            return {
              ...item,
              edit: true
            }
          } else {
            return item
          };
        })
      };
    case EDIT_CLOTHER_VALUE:
      return {
        ...state,
        clothers: state.clothers.map((item, index) => {
          if (index === state.indexClother && action.value.trim !== '' ) {
            return {
              name: action.value,
              edit: false
            };
          } else {
            return item;
          }
        })
      };
    case DELETE_CLOTHER:
      return {
        ...state,
        clothers: state.clothers.filter((item, index) => index !== action.index)
      }
    default:
      return state;
  };
};

let store = Redux.createStore(getNextState);

function render() {
  const listOfClothers = document.querySelector('#listOfClothers');
  listOfClothers.innerHTML = '';
  const listClothers = store.getState().clothers;
 
  for (let i = 0; i < listClothers.length; i++) {
    if (!listClothers[i].edit) {
      let liClother = document.createElement('li');
      liClother.innerHTML = listClothers[i].name;
      let editItem = document.createElement('input');
      editItem.type = 'button';
      editItem.value = 'edit';
      editItem.addEventListener('click', () => {
        store.dispatch(selectClotherAction(i));
        store.dispatch(changeEditModeAction());
      });
      liClother.append(editItem); 
      listOfClothers.append(liClother);
    } else {
        let clotherItemInput = document.createElement('input');
        clotherItemInput.type = 'text';
        clotherItemInput.value = listClothers[i].name;
        clotherItemInput.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) {
            if (e.target.value.trim() !== '') {
              store.dispatch(editClotherAction(e.target.value));
            } else {
              store.dispatch(deleleItemAction(i));
            }
          };
        });

        listOfClothers.append(clotherItemInput);
    }
   };
};

store.subscribe(() => {
  render();
});

render();
