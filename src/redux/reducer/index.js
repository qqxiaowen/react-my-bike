
const initstate ={
    menuItemText:'首页',
    demo:'这是一段描述'
}
export default (state = initstate, action) => {
    switch(action.type){
        case 'CHANGE_MENUITEM':
            return { ...state, menuItemText:action.text};
        default:
            return state;
    }
}
