// Form 클래스 컴포넌트는 사용자의 Todo를 입력 받아 추가하는 Component이다.

import React, { useState } from 'react';

export function Form() {
  
  return (
    <form>
      <input type="text" contents="contents" />
      <input type="submit" value="OK" />
    </form>
  );
}
