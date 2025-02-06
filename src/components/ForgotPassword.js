import React from 'react';

const ForgotPassword = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;