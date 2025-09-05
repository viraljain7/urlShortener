import React, { useRef, useEffect } from 'react';
import { LoginForm } from './Login';
import { RegisterForm } from './Register';
import { gsap } from 'gsap';

function Auth() {
  const [loginPage, setLoginPage] = React.useState(true);
  const containerRef = useRef(null);

  const changePage = () => {
    // First half flip
    gsap.to(containerRef.current, {
      rotationY: 90, // rotate halfway
      duration: 0.3,
      ease: 'power1.in',
      onComplete: () => {
        // Switch content
        setLoginPage(!loginPage);
        // Complete flip
        gsap.to(containerRef.current, {
          rotationY: 0, // rotate back to normal
          duration: 0.3,
          ease: 'power1.out',
        });
      },
    });
  };

  useEffect(() => {
    // Ensure container preserves 3D
    gsap.set(containerRef.current, { transformStyle: 'preserve-3d' });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto"
      style={{ perspective: '1000px' }}
    >
      {loginPage ? <LoginForm changePage={changePage} /> : <RegisterForm changePage={changePage} />}
    </div>
  );
}

export default Auth;
