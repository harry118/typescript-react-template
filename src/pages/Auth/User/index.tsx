import React, { useState } from 'react';
import { Button } from 'antd';
interface IUserProps {
  test?: string;
}

const User: React.FC<IUserProps> = () => {
  return (
    <div>
      <Button>User</Button>
    </div>
  );
};
export default User;
