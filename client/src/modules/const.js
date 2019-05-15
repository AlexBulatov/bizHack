export const IP_HOST = 'https://cors-anywhere.herokuapp.com/http://217.71.138.9:4567';
export const ROOT_DIRECTORY = '/';

export const PATH_EMPLOYER = '/employer';//работодатель
export const PATH_PILOT = '/pilot';//пилот

/*Requests constants*/
export const ALL_USERS_PATH = "/api/user/list?mode=0";//<-- отказываемся

//установка текущего пользователя
export function setCurrentUser(newCurrentUser) {
    localStorage.setItem('UserData', JSON.stringify(newCurrentUser));
}

//возвращение текущего пользователя
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('UserData')) == null ? 'empty' : JSON.parse(localStorage.getItem('UserData'));

}

export function redirect(typeId) {
    if (getCurrentUser().typeId !== typeId)
        switch (getCurrentUser().typeId) {
            case 2:
                document.location.href = `${PATH_EMPLOYER}`;
                break;
            case 3:
                document.location.href = `${PATH_PILOT}`;
                break;
            default://если нет такого id => на вход
                //setCurrentUser({});
                document.location.href = `${ROOT_DIRECTORY}`;
                break;
        }
}