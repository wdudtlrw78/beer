import React from 'react';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 4rem)',
      }}
    >
      로드 중...
    </div>
  );
};

export default Loading;
