import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  uri: string;
  replace?: boolean;
};

export const Redirect: React.FC<Props> = (props) => {
  const { uri, replace } = props;
  const navigate = useNavigate();

  useEffect(() => navigate(uri, { replace }), []);

  return null;
};
