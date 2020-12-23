import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';

export default Loading = ({ isLoading }) => {
  return (
    <Modal transparent animationType="none" visible={isLoading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="#3266af"
            animating={isLoading}
          />
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            Aguarde, processando.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 140,
    width: 140,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};
