import { web3 } from './web3';
import Cookies from 'js-cookie';

const isSessionValid = async () => {
    const walletId = Cookies.get('walletId'); 
    const password = Cookies.get('password'); 

    try {
        await web3.eth.personal.unlockAccount(walletId, password, 600);
        return true;
    } catch (error) {
        return false;
    }
}

export default isSessionValid;
