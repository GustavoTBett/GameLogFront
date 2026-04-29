'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import * as S from './InputOTP.styled';


function InputOTP(props: React.ComponentProps<typeof OTPInput>) {
  return (
    <S.InputOTPWrapper>
      <OTPInput data-slot="input-otp" {...props} />
    </S.InputOTPWrapper>
  );
}

function InputOTPGroup({ ...props }: React.ComponentProps<'div'>) {
  return <S.InputOTPGroupRoot data-slot="input-otp-group" {...props} />;
}

export interface InputOTPSlotProps extends React.ComponentProps<'div'> {
  index: number;
}

function InputOTPSlot({ index, ...props }: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext);
  
  
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {
    char: '',
    hasFakeCaret: false,
    isActive: false,
  };

  return (
    <S.InputOTPSlotRoot
      data-slot="input-otp-slot"
      data-active={isActive}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <S.CaretContainer>
          <S.CaretBlink />
        </S.CaretContainer>
      )}
    </S.InputOTPSlotRoot>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <S.InputOTPSeparatorRoot data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </S.InputOTPSeparatorRoot>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };