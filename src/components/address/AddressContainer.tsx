import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  FormLabel,
  Button,
  FormControl,
  Box,
} from '@mui/material';

import { api } from '../../api/api';
import { validateTel } from '../../lib/validation';

export default function AddressContainer() {
  return <div></div>;
}
