import React, { ReactNode } from 'react';
import RNModal, { Direction } from 'react-native-modal';
import { ViewStyle } from 'react-native';

import styles from './modal.styles';

interface ModalProps {
  isVisible: boolean;
  avoidKeyboard?: boolean;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'center' | 'bottom' | 'top';
  swipeDirection?: Direction | Direction[];
  onSwipeComplete?: () => void;
}

const Modal = ({
  children,
  isVisible,
  avoidKeyboard = true,
  style,
  variant,
  ...props
}: ModalProps) => {
  const bottomStyle: ViewStyle =
    variant === 'bottom'
      ? styles.modalBottom
      : variant === 'top'
      ? styles.modalTop
      : {};

  return (
    <RNModal
      animationOut={variant === 'top' ? 'slideOutUp' : 'slideOutDown'}
      animationIn={variant === 'top' ? 'slideInDown' : 'slideInUp'}
      isVisible={isVisible}
      style={[styles.modal, bottomStyle, style]}
      avoidKeyboard={avoidKeyboard}
      propagateSwipe
      {...props}>
      {children}
    </RNModal>
  );
};

export default Modal;
