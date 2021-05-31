import React, {useEffect,useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Times from '../times/times';
const App = props => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimeOptions, setEndTimeOptions]=useState([])

  useEffect(()=>{
    let times=Times.filter(time =>time>startTime)
    setEndTimeOptions(times)
  },[startTime])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setShowModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.texts.text}</Text>
          {props.texts.buttonText && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: '5%',
                height:"15%",
                width:"80%"

              }}>
              <ModalDropdown
                options={Times}
                style={styles.dropDown}
                defaultValue="start time"
                onSelect={(id, value) => setStartTime(value)}
              />
              <ModalDropdown
                disabled={!startTime}
                style={styles.dropDown}
                options={endTimeOptions}
                onSelect={(id, value) => setEndTime(value)}
                defaultValue="end time"
              />
            </View>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {props.texts.buttonText && (
              <Pressable
              disabled={!startTime || !endTime}
                style={[
                  styles.button,
                  styles.buttonClose,
                  {backgroundColor: 'green', margin: '5%'},
                ]}
                onPress={() => props.texts.callback(startTime, endTime, props.texts.date)}>
                <Text style={styles.textStyle}>{props.texts.buttonText}</Text>
              </Pressable>
            )}
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {backgroundColor: 'red', margin: '5%'},
              ]}
              onPress={() => props.setShowModal(false)}>
              <Text style={styles.textStyle}>{'Close'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dropDown: {
    marginRight: '5%',
    borderColor: 'black',
    width:"50%",
    padding:2,
    borderWidth: 1,
    borderRadius: 2,
  },
});

export default App;
