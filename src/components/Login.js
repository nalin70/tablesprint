// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//     const [loginId, setLoginId] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();
//         // Handle login logic here
//         // If login is successful, navigate to the Dashboard page
//         navigate('/dashboard');
//     };

//     const handleForgotPassword = () => {
//         // Handle forgot password logic here, e.g., redirect to forgot password page
//         navigate('/forgot-password');
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Login ID:</label>
//                     <input
//                         type="text"
//                         value={loginId}
//                         onChange={(e) => setLoginId(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             <div>
//                 <button onClick={handleForgotPassword}>Forgot Password?</button>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        // If login is successful, navigate to the Dashboard page
        navigate('/dashboard');
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here, e.g., redirect to forgot password page
        navigate('/forgot-password');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Login ID:</label>
                        <input
                            type="text"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="forgot-password">
                    <button onClick={handleForgotPassword}>Forgot Password?</button>
                </div>
            </div>
        </div>
    );
};

export default Login;