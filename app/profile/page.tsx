import Image from 'next/image';
import styles from './page.module.css';
import FileIcon from '@/public/file.svg';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import Profile from '@components/Profile';

export default function Page() {
  return (
    <Profile/>
  );
}
