import React, { useState, useReducer, useCallback } from 'react';

import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  IconButton,
  Text,
  Card,
  CardFooter,
  CardBody,
  Box,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useForm } from 'react-hook-form';

import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface AuthenticatorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (userData: any) => void;
  onFailure: () => void;
}

export default function Authenticator({
  onSuccess,
  onFailure,
}: AuthenticatorProps) {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setError] = useState('');
  const [showPassword, togglePassword] = useReducer((v) => !v, false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmitCb = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (formData: any) => {
      const { email, password } = formData || {};
      if (!email || !password) {
        setError('Missing credentials');
        return;
      }
      setError('');
      setLoading(true);
      try {
        const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: String(email).split('@')[0],
            password: String(password),
            // expiresInMins: 60, // optional
          }),
        });
        const resData = await res.json();
        if (res.status >= 500) {
          throw new Error(resData.message || 'Something went wrong');
        } else if (res.status >= 400) {
          throw new Error(resData.message || 'Invalid Request');
        }
        onSuccess(resData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  return (
    <Card
      as="form"
      minWidth={96}
      className={styles['container']}
      onSubmit={handleSubmit(onSubmitCb)}
    >
      <CardBody>
        <Heading color="gray">Sign In</Heading>
        <FormControl
          isDisabled={isLoading}
          isInvalid={
            Boolean(errMsg) || Boolean(errors.email && errors.email.message)
          }
        >
          <FormLabel>Email Address</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AtSignIcon />
            </InputLeftElement>
            <Input
              data-testid="auth-email"
              type="email"
              placeholder="Email"
              disabled={isSubmitting}
              {...register('email', {
                required: 'Email is required',
                minLength: {
                  value: 6,
                  message: 'Minimum Email length should be 6',
                },
              })}
            />
          </InputGroup>
          <FormHelperText fontSize={8} fontFamily="monospace" textAlign="right">
            You can use any user's credentials from{' '}
            <a href="https://dummyjson.com/users">dummyjson.com/users</a>
          </FormHelperText>
          {errors.email && errors.email.message ? (
            <FormErrorMessage data-testid="auth-error-email">
              {String(errors.email.message)}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl
          isDisabled={isLoading}
          isInvalid={
            Boolean(errMsg) ||
            Boolean(errors.password && errors.password.message)
          }
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <LockIcon />
            </InputLeftElement>
            <Input
              data-testid="auth-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum Password length should be 6',
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label={showPassword ? 'Show Password' : 'Hide Password'}
                size="sm"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={togglePassword}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && errors.password.message ? (
            <FormErrorMessage data-testid="auth-error-password">
              {String(errors.password.message)}
            </FormErrorMessage>
          ) : null}
        </FormControl>
      </CardBody>
      <CardFooter>
        <Box w="100%">
          <Button
            data-testid="auth-submit"
            isDisabled={isLoading}
            isLoading={isLoading}
            colorScheme="green"
            w="100%"
            type="submit"
          >
            Sign In
          </Button>
          {errMsg ? (
            <Text
              data-testid="auth-error"
              title={String(errMsg)}
              fontSize={12}
              color="red"
              textAlign="center"
            >
              Invalid Credentials
            </Text>
          ) : null}
        </Box>
      </CardFooter>
    </Card>
  );
}
