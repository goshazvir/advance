import React from 'react';

import {Tooltip} from '@mui/material';

const EllipsisText: React.FC<{text: string; maxLines?: number}> = ({
  text,
  maxLines = 1,
}) => {
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleMouseEnter = () => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight,
      );
    }
  };

  const textStyles: React.CSSProperties = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: maxLines,
    lineClamp: maxLines,
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  };

  const content = (
    <span ref={textRef} style={textStyles} onMouseEnter={handleMouseEnter}>
      {text}
    </span>
  );

  return showTooltip ? <Tooltip title={text}>{content}</Tooltip> : content;
};

export default EllipsisText;
