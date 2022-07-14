import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import './App.css';

const App = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Form Validation</h2>

        <InputBox>
          <label htmlFor="Username" style={{ display: 'block' }}>
            Username
          </label>
          <input
            type="text"
            {...register('username', {
              required: 'กรุณาใส่ข้อมูลชื่อผู้ใช้ของคุณ.',
              minLength: {
                value: 6,
                message: 'ต้องมากกว่า 5 ตัวษร และไม่เกิน 12 ตัวอักษร.',
              },
              maxLength: { value: 12, message: 'มีตัวอักษรเกิน12ตัว.' },
            })}
          />
        </InputBox>
        {errors.username && (
          <p style={{ color: '#ff0000', width: '100%' }}>
            {errors.username.message}
          </p>
        )}

        <InputBox>
          <label htmlFor="Email" style={{ display: 'block' }}>
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'กรุณาใส่ข้อมูลอีเมลของคุณ.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: 'รูปแบบอีเมลของคุณไม่ถูกต้อง.',
              },
            })}
          />
        </InputBox>
        {errors.email && (
          <p style={{ color: '#ff0000', width: '100%' }}>
            {errors.email.message}
          </p>
        )}

        <InputBox>
          <label htmlFor="Password" style={{ display: 'block' }}>
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'กรุณาใส่รหัสผ่านของคุณ.',
              minLength: { value: 6, message: 'มากกว่าเท่ากับ 6 ตัวอักษร.' },
              validate: (value) => {
                const isValid =
                  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)/.test(
                    value
                  );
                if (!isValid)
                  return 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรใหญ่ 1 ตัวอักษรเล็ก 1 ตัวเลข และ 1 ตัวอักษรพิเศษ.';
                else return true;
              },
            })}
          />
        </InputBox>
        {errors.password && (
          <p style={{ color: '#ff0000', width: '100%' }}>
            {errors.password.message}
          </p>
        )}

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  text-align: left;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
`;

const InputBox = styled.div`
  margin: 10px 0;
`;

export default App;
