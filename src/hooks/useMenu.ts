import React, {useState} from 'react';

type UseMenuReturn = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
};

export const useMenu = (): UseMenuReturn => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setAnchorEl(null);
  };

  return {anchorEl, open, handleClick, handleClose, setAnchorEl};
};
