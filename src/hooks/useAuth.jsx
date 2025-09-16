import React, { use } from 'react';
import { AuthContest } from '../contexts/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContest);
    return authInfo;
};

export default useAuth;