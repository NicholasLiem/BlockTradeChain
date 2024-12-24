import Cookies from 'js-cookie';

const isSessionValid = () => {
    if (Cookies.get('walletId')) {
        return true;
    } else {
        return false;
    }
}

export default isSessionValid;
