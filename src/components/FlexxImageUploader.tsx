import {toast} from 'react-toastify';
import {useDropzone} from 'react-dropzone';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import FlexxIcon from './FlexxIcon/FlexxIcon';
import {Box, IconButton, Typography, TypographyProps} from '@mui/material';

const FlexxImageUploader = forwardRef<
  {resetPreview: () => void},
  {
    onUploadFile?: (file: File | null) => void;
    uploadButtonText?: string;
    file_url?: string;
    disabled?: boolean;
    text?: string;
    textVariant?: TypographyProps['variant'];
    onRemoveFile?: () => void;
  }
>(
  (
    {
      onUploadFile,
      file_url,
      disabled = false,
      text = 'Drag and drop an image here, or click to select one',
      onRemoveFile,
      textVariant = 'body2',
    },
    ref,
  ) => {
    const [preview, setPreview] = useState<string | null>(file_url ?? null);

    useEffect(() => {
      setPreview(file_url ?? null);
    }, [file_url]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
          onUploadFile?.(file);
          setPreview(URL.createObjectURL(file));
        }
      },
      [onUploadFile],
    );

    const onDropRejected = React.useCallback(() => {
      toast.error('Please upload only JPG, JPEG or PNG image files.');
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      onDropRejected,
      maxFiles: 1,
      accept: {
        'image/jpeg': ['.jpg', '.jpeg', '.png'],
      },
      disabled,
    });

    useImperativeHandle(
      ref,
      () => ({
        resetPreview: () => {
          setPreview(file_url ?? null);
        },
      }),
      [file_url],
    );

    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        textAlign={'center'}
        gap={4}
      >
        <Box
          {...getRootProps()}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
          padding={'2rem'}
          border={'2px dashed'}
          borderColor={'divider'}
          borderRadius={1}
          sx={{
            cursor: 'pointer',
            minWidth: 300,
            minHeight: 150,
            position: 'relative',
          }}
        >
          <input {...getInputProps()} />
          {preview && onRemoveFile && (
            <IconButton
              onClick={onRemoveFile}
              size='small'
              sx={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
              }}
              color='error'
            >
              <FlexxIcon
                icon='fluent--dismiss-16-regular'
                width={16}
                height={16}
              />
            </IconButton>
          )}
          {preview && (
            <img
              src={preview}
              alt={'preview'}
              style={{maxWidth: 150, maxHeight: 80}}
            />
          )}
          {!preview && (
            <Typography
              variant={textVariant}
              color='textSecondary'
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              {text}
            </Typography>
          )}
          {preview && (
            <Typography
              variant='body2'
              sx={{
                position: 'absolute',
                bottom: '0.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '100%',
              }}
              color='textSecondary'
            >
              Click or drag to switch image
            </Typography>
          )}
        </Box>
      </Box>
    );
  },
);

export default FlexxImageUploader;
