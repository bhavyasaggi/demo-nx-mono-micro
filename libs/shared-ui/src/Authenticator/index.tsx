import React, { useState, useReducer, useCallback } from 'react';

import {
  Box,
  VStack,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
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
  const [isError, setError] = useState(false);
  const [showPassword, togglePassword] = useReducer((v) => !v, false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmitCb = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (formData: any) => {
      const { email, password } = formData || {};
      if (!email || !password) {
        setError(true);
      }
      setLoading(true);
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: String(email).split('@')[0],
          password: String(password),
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => res.json())
        .then((userData) => {
          onSuccess(userData);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [onSuccess]
  );

  return (
    <Box
      as="form"
      minWidth={96}
      border="1px"
      rounded={4}
      p="6"
      className={styles['container']}
      onSubmit={handleSubmit(onSubmitCb)}
    >
      <VStack spacing={6}>
        <FormControl
          isDisabled={isLoading}
          isInvalid={isError || Boolean(errors.email && errors.email.message)}
        >
          <FormLabel>Email Address</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AtSignIcon />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Email"
              disabled={isSubmitting}
              {...register('email', {
                required: 'Email is required',
                minLength: {
                  value: 4,
                  message: 'Minimum Email length should be 4',
                },
              })}
            />
          </InputGroup>
          <FormHelperText fontSize={8} fontFamily="monospace" textAlign="right">
            You can use any user's credentials from{' '}
            <a href="https://dummyjson.com/users">dummyjson.com/users</a>
          </FormHelperText>
          {errors.email && errors.email.message ? (
            <FormErrorMessage>{String(errors.email.message)}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl
          isDisabled={isLoading}
          isInvalid={
            isError || Boolean(errors.password && errors.password.message)
          }
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <LockIcon />
            </InputLeftElement>
            <Input
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
              <Button size="sm" onClick={togglePassword}>
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && errors.password.message ? (
            <FormErrorMessage>
              {String(errors.password.message)}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <Box w="100%">
          <Divider colorScheme="gray" />
          <InputGroup>
            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              colorScheme="green"
              w="100%"
              type="submit"
            >
              Sign In
            </Button>
            {isError ? (
              <FormErrorMessage>Invalid Credentials</FormErrorMessage>
            ) : null}
          </InputGroup>
        </Box>
      </VStack>
    </Box>
  );
}
